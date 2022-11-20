import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { BasicGuard } from '../auth/basic.guard';
import { Job } from './job.model';
import { IRequest } from '../shared/types';
import { GetJobsParams } from '../api/dto';

@UseGuards(BasicGuard)
@Controller('/jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get('/')
  async getJobs(
    @Query() params: GetJobsParams,
    @Req() req: IRequest,
  ): Promise<Job[]> {
    if (params.hasOwnProperty('paid')) {
      return this.jobService.getUnpaidJobs(
        [1, '1', true, 'true'].includes(params.paid),
        req.profile.id,
      );
    }

    throw new Error('unimplemented');
  }
  @Post('/:id/pay')
  async payJob(@Param('id') id: string, @Req() req: IRequest): Promise<Job> {
    return this.jobService.payJob(parseInt(id, 10), req.profile.id);
  }
}
