import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiEnvSchemaType } from '@openathlete/shared';

type ServiceAccountJson = {
  project_id?: string;
  client_email?: string;
  private_key?: string;
};

export type VerifiedFirebaseIdToken = {
  uid: string;
  email: string;
  name?: string;
  picture?: string;
};

@Injectable()
export class FirebaseAuthService {
  constructor(
    private readonly configService: ConfigService<ApiEnvSchemaType, true>,
  ) {}

  private getFirebaseAuth() {
    if (getApps().length === 0) {
      const raw = this.configService.get('FIREBASE_SERVICE_ACCOUNT_JSON');
      if (!raw) {
        throw new InternalServerErrorException(
          'Firebase Auth is not configured (missing FIREBASE_SERVICE_ACCOUNT_JSON)',
        );
      }

      let parsed: ServiceAccountJson;
      try {
        parsed = JSON.parse(raw) as ServiceAccountJson;
      } catch {
        throw new InternalServerErrorException(
          'Invalid FIREBASE_SERVICE_ACCOUNT_JSON (must be valid JSON)',
        );
      }

      const clientEmail = parsed.client_email;
      const privateKey = parsed.private_key?.replace(/\\n/g, '\n');

      if (!clientEmail || !privateKey) {
        throw new InternalServerErrorException(
          'Invalid FIREBASE_SERVICE_ACCOUNT_JSON (missing client_email/private_key)',
        );
      }

      initializeApp({
        credential: cert({
          projectId: parsed.project_id,
          clientEmail,
          privateKey,
        }),
      });
    }

    return getAuth();
  }

  async verifyIdToken(idToken: string): Promise<VerifiedFirebaseIdToken> {
    const auth = this.getFirebaseAuth();

    let decoded: {
      uid: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      picture?: string;
    };

    try {
      decoded = (await auth.verifyIdToken(idToken)) as typeof decoded;
    } catch {
      throw new UnauthorizedException('Invalid Firebase ID token');
    }

    if (!decoded.email) {
      throw new UnauthorizedException('Firebase token has no email');
    }
    if (decoded.email_verified === false) {
      throw new UnauthorizedException('Email is not verified');
    }

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
    };
  }
}
