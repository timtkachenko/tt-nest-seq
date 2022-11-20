import { Profile } from '../profile/profile.model';
import { Request } from 'express';

export interface IRequest extends Request {
  profile: Profile;
}
