import { Module, forwardRef } from '@nestjs/common';

import { AuthModule } from '../auth';
import { CoreModule } from '../core/core.module';
import { PrismaService } from '../prisma/services/prisma.service';
import { SeoPlanController } from './seo-plan.controller';
import { SeoPlanService } from './seo-plan.service';

@Module({
  imports: [AuthModule, forwardRef(() => CoreModule)],
  controllers: [SeoPlanController],
  providers: [SeoPlanService, PrismaService],
  exports: [SeoPlanService],
})
export class SeoPlanModule {}
