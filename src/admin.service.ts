import { Inject, Injectable } from '@nestjs/common';
import { BaseBestParams } from './api/dto';
import { Profile } from './profile/profile.model';
import { sequelize } from './shared/database.providers';
import { QueryTypes } from 'sequelize';
import { PROFILE_REPOSITORY } from './shared/const';

@Injectable()
export class AdminService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private readonly profileRepo: typeof Profile,
  ) {}

  async getBestProfession(params: BaseBestParams) {
    const sql = `SELECT p.id, p.profession, SUM(price) AS sum
                     FROM Profiles p
                         LEFT JOIN Contracts as c
                     on p.id= c.ContractorId
                         LEFT JOIN Jobs as j on c.id=j.ContractId AND j.paid = true
                     where j.paymentDate <= :
        end AND j.paymentDate >= :start
        group by p.profession
        order by sum DESC`;

    const profile = await sequelize.query<Profile>(sql, {
      replacements: {
        end: params.end,
        start: params.start,
      },
      type: QueryTypes.SELECT,
      plain: true,
      raw: false,
    });
    return profile;
  }

  async getBestClients(params: BaseBestParams) {
    const sql = `SELECT p.id, SUM(price) AS sum
                     FROM Profiles p
                         LEFT JOIN Contracts as c
                     on p.id= c.ClientId
                         LEFT JOIN Jobs as j on c.id=j.ContractId AND j.paid = true
                     where j.paymentDate <= :
        end AND j.paymentDate >= :start
        group by p.id
        order by sum DESC
        limit 0,:limit`;

    const profiles = await sequelize.query<Profile>(sql, {
      replacements: {
        end: params.end,
        start: params.start,
        limit: params.limit || 2,
      },
      type: QueryTypes.SELECT,
      raw: false,
    });
    return profiles;
  }
}
