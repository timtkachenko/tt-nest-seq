import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { Contract } from '../contract/contract.model';

@Table
export class Job extends Model {
  @Column({
    type: Sequelize.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: Sequelize.DECIMAL(12, 2),
    allowNull: false,
  })
  price: number;

  @Column({ type: Sequelize.BOOLEAN, defaultValue: false })
  paid: boolean;

  @Column({ type: Sequelize.DATE })
  paymentDate: string;

  @BelongsTo(() => Contract, 'ContractId')
  contract: Contract;
}
