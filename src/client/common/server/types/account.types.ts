import { ITableUsers } from '../../../local/imports';
import { IUser } from './user.types';

export type IUserResponse = IUser | null;

export type IUserUpdateParams = Pick<
  ITableUsers,
  'name' | 'mobile' | 'password'
>;
