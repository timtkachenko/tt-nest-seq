import { Inject, Injectable } from '@nestjs/common';
import { Profile } from '../profile/profile.model';
import { PROFILE_REPOSITORY } from '../shared/const';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private profileRepository: typeof Profile,
  ) {}

  async getProfile(profileId: number) {
    return this.profileRepository.findOne({
      where: { id: profileId },
      attributes: ['id', 'type'],
    });
  }
}
