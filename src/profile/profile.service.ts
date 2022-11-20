import { Inject, Injectable } from '@nestjs/common';
import { Profile } from './profile.model';
import { Job } from '../job/job.model';
import { Contract } from '../contract/contract.model';
import { sequelize } from '../shared/database.providers';
import { PROFILE_REPOSITORY } from '../shared/const';

const DEPOSIT_THRESHOLD = 0.25;

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepo: typeof Profile,
  ) {}

  async deposit(amount: number, profileId: number) {
    let profile: Profile;
    await sequelize.transaction(async (txn) => {
      profile = await this.profileRepo.findOne({
        transaction: txn,
        lock: txn.LOCK.UPDATE,
        where: { id: profileId },
        include: {
          model: Contract,
          as: 'client',
          required: true,
          include: [
            {
              model: Job,
              as: 'jobs',
              required: true,
              where: { paid: false },
            },
          ],
        },
        group: ['client.id'],
        having: sequelize.literal(
          `(SUM(\`client->jobs\`.price)*${DEPOSIT_THRESHOLD}) >= :amount`,
        ),
        replacements: { amount: amount },
      });
      if (!profile) {
        throw new Error('requirements unmet');
      }
      profile.balance += amount;
      profile.updatedAt = new Date().toISOString();
      await profile.save({ transaction: txn });
    });

    return profile;
  }
}
