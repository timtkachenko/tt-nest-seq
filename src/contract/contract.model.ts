import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Job } from '../job/job.model';
import { Profile } from '../profile/profile.model';

export enum ContractStatus {
  new = 'new',
  in_progress = 'in_progress',
  terminated = 'terminated',
}

@Table
export class Contract extends Model {
  @Column({
    type: Sequelize.TEXT,
    allowNull: false,
  })
  terms: string;

  @Column({ type: Sequelize.ENUM(...Object.keys(ContractStatus)) })
  status: string;

  @BelongsTo(() => Profile, 'ContractorId')
  contractor: Profile;

  @BelongsTo(() => Profile, 'ClientId')
  client: Profile;

  @HasMany(() => Job, 'ContractId')
  jobs;
}
