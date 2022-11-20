import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      context.switchToHttp().getResponse();
      const profileId = parseInt(req.get('profile_id'), 10) || 0;
      const profile = await this.authService.getProfile(profileId);
      if (!profile) {
        throw new Error(`not found ${profileId}`);
      }
      req.profile = profile;
    } catch (e) {
      console.log(e);
      throw e;
    }
    return true;
  }
}
