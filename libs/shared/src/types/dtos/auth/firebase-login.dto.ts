import { z } from 'zod';

export const firebaseLoginDtoSchema = z.object({
  idToken: z.string().min(1),
  invitationToken: z.string().optional(),
  coachInvitationToken: z.string().optional(),
});

export type FirebaseLoginDto = z.infer<typeof firebaseLoginDtoSchema>;
