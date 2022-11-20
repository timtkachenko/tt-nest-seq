import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BasicGuard } from '../auth/basic.guard';
import { ProfileService } from './profile.service';
import { Profile } from './profile.model';
import { IRequest } from '../shared/types';
import { DepositParams } from '../api/dto';

@UseGuards(BasicGuard)
@Controller('/balances')
export class BalanceController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('/deposit/:profileId')
  async deposit(
    @Param('profileId') profileId: string,
    @Body() input: DepositParams,
    @Req() req: IRequest,
  ): Promise<Profile> {
    // todo is it admin EP?
    return this.profileService.deposit(
      parseInt(input.amount, 10),
      parseInt(profileId, 10),
    );
  }
}
