import { IUser } from './user.types';

export type IUserResponse = IUser | null;

export type IUserUpdateParams = {
  name: string;
  mobile: string;
  password: string;
};
