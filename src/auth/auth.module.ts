import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { BasicGuard } from './basic.guard';
import { AuthService } from './auth.service';
import { Profile } from '../profile/profile.model';
import { PROFILE_REPOSITORY } from '../shared/const';
const providers = [
  {
    provide: PROFILE_REPOSITORY,
    useValue: Profile,
  },
  AuthService,
  BasicGuard,
];

@Module({
  imports: [SharedModule],
  exports: providers,
  providers,
})
export class AuthModule {}
