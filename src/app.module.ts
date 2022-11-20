import { Module } from '@nestjs/common';
import { ContractModule } from './contract/contract.module';
import { JobModule } from './job/job.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './admin.controller';
import { ProfileModule } from './profile/profile.module';
import { AdminService } from './admin.service';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [ContractModule, JobModule, SharedModule, AuthModule, ProfileModule],
})
export class AppModule {}
