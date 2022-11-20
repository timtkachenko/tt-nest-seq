import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { Job } from './job.model';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { JOB_REPOSITORY } from '../shared/const';

const providers = [
  {
    provide: JOB_REPOSITORY,
    useValue: Job,
  },
  JobService,
];

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [JobController],
  providers,
})
export class JobModule {}
