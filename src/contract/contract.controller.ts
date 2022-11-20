import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { BasicGuard } from '../auth/basic.guard';
import { Contract } from './contract.model';
import { IRequest } from '../shared/types';

@UseGuards(BasicGuard)
@Controller('/contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get('/:id')
  async getContract(
    @Param('id') id: string,
    @Req() req: IRequest,
  ): Promise<Contract> {
    return this.contractService.getContract(parseInt(id, 10), req.profile.id);
  }

  @Get('/')
  async getContracts(@Req() req: IRequest): Promise<Contract[]> {
    return this.contractService.getContracts(req.profile.id);
  }
}
