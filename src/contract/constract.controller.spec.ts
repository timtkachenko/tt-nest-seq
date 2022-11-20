import { Test, TestingModule } from '@nestjs/testing';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { IRequest } from '../shared/types';
import { CONTRACT_REPOSITORY, PROFILE_REPOSITORY } from '../shared/const';
import { AuthModule } from '../auth/auth.module';

describe('AppController', () => {
  let appController: ContractController;
  const repo = { findOne: jest.fn() };
  const req = {
    profile: {
      id: 2,
    },
  } as IRequest;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [ContractController],
      providers: [
        {
          provide: CONTRACT_REPOSITORY,
          useValue: repo,
        },
        {
          provide: PROFILE_REPOSITORY,
          useValue: {},
        },
        ContractService,
      ],
    }).compile();

    appController = app.get<ContractController>(ContractController);
  });

  describe('root', () => {
    it('should return response', async () => {
      repo.findOne = jest.fn().mockReturnValue({ id: '1' });
      expect(await appController.getContract('1', req)).toEqual({ id: '1' });
    });
  });
});
