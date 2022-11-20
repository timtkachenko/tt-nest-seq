import { Inject, Injectable } from '@nestjs/common';
import { Contract, ContractStatus } from './contract.model';
import { Op } from 'sequelize';
import { CONTRACT_REPOSITORY } from '../shared/const';

@Injectable()
export class ContractService {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private contractRepository: typeof Contract,
  ) {}

  getContract(id: number, profileId: number): Promise<Contract> {
    return this.contractRepository.findOne({
      where: {
        id,
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
    });
  }

  getContracts(profileId: number) {
    return this.contractRepository.findAll({
      where: {
        status: { [Op.not]: ContractStatus.terminated },
        [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
      },
    });
  }
}
