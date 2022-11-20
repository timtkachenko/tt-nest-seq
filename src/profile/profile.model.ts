import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Contract } from '../contract/contract.model';

export enum ClientType {
  client = 'client',
  contractor = 'contractor',
}
@Table
export class Profile extends Model {
  @Column(Sequelize.STRING)
  firstName: string;

  @Column(Sequelize.STRING)
  lastName: string;

  @Column(Sequelize.STRING)
  profession: string;

  @Column({ type: Sequelize.DECIMAL(12, 2) })
  balance: number;

  @Column({ type: Sequelize.ENUM(...Object.keys(ClientType)) })
  type: string;

  @HasMany(() => Contract, 'ContractorId')
  contractor: Contract;

  @HasMany(() => Contract, 'ClientId')
  client: Contract;
}
