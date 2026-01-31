import { ITableUsers } from '../../../local/imports';

export const USER_STATUS_MAP = {
  NOT_LOGGED_IN: 0,
  NOT_CONFIRMED: 1,
  LOGGED_IN: 2,
  /* 'WAITING': 3, */
  INVITING: 3,
  INSIDE_NET: 4,
  DEV: Infinity,
};
export type UserStatusKey = keyof typeof USER_STATUS_MAP;

export type IUser = Omit<ITableUsers, 'password'> & {
  user_status: UserStatusKey;
};
