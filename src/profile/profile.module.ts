import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';
import { BalanceController } from './balance.controller';
import { AuthModule } from '../auth/auth.module';
import { PROFILE_REPOSITORY } from '../shared/const';

const providers = [
  {
    provide: PROFILE_REPOSITORY,
    useValue: Profile,
  },
  ProfileService,
];

@Module({
  imports: [SharedModule, AuthModule],
  controllers: [BalanceController],
  providers,
  exports: providers,
})
export class ProfileModule {}
