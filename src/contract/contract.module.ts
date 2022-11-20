import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { Contract } from './contract.model';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { CONTRACT_REPOSITORY } from '../shared/const';

const providers = [
  {
    provide: CONTRACT_REPOSITORY,
    useValue: Contract,
  },
  ContractService,
];

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [ContractController],
  providers,
})
export class ContractModule {}
