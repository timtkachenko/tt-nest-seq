import { Inject, Injectable } from '@nestjs/common';
import { Job } from './job.model';
import { Op } from 'sequelize';
import { Contract } from '../contract/contract.model';
import { Profile } from '../profile/profile.model';
import { sequelize } from '../shared/database.providers';
import { JOB_REPOSITORY } from '../shared/const';

@Injectable()
export class JobService {
  constructor(
    @Inject(JOB_REPOSITORY)
    private readonly jobRepo: typeof Job,
  ) {}

  getUnpaidJobs(paid: boolean, profileId: number) {
    return this.jobRepo.findAll({
      where: {
        paid,
      },
      include: {
        model: Contract,
        attributes: [],
        where: {
          [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
        },
      },
    });
  }

  async payJob(jobId: number, profileId: number) {
    let job: Job;
    try {
      await sequelize.transaction(async (txn) => {
        job = await this.jobRepo.findOne({
          where: { id: jobId, paid: false },
          lock: txn.LOCK.UPDATE,
          transaction: txn,
          include: [
            {
              model: Contract,
              include: [
                {
                  model: Profile,
                  as: 'contractor',
                  required: true,
                },
                {
                  model: Profile,
                  as: 'client',
                  required: true,
                },
              ],
              where: { ClientId: profileId },
              required: true,
            },
          ],
        });
        if (!job) {
          throw new Error('job not found');
        }

        if (job.contract.client.balance < job.price) {
          throw new Error('unavailable funds');
        }
        job.paid = true;
        job.paymentDate = new Date().toISOString();
        job.contract.client.balance -= job.price;
        job.contract.contractor.balance += job.price;

        await job.save({ transaction: txn });
        await job.contract.client.save({ transaction: txn });
        await job.contract.contractor.save({ transaction: txn });
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
    return job;
  }
}
