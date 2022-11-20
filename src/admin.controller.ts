import { BasicGuard } from './auth/basic.guard';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Profile } from './profile/profile.model';
import { BestClients, BestProfession } from './api/dto';
import { IRequest } from './shared/types';

@UseGuards(BasicGuard)
@Controller('/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/best-profession')
  async bestProfession(
    @Query() params: BestProfession,
    @Req() req: IRequest,
  ): Promise<Profile> {
    return this.adminService.getBestProfession(params);
  }

  @Get('/best-clients')
  async bestClients(
    @Query() params: BestClients,
    @Req() req: IRequest,
  ): Promise<Profile[]> {
    return this.adminService.getBestClients(params);
  }
}
