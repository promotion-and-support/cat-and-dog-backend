/* eslint-disable max-lines */
export const TABLES_MAP = {
  USERS: 'users',
  USERS_TOKENS: 'users_tokens',
  SESSIONS: 'sessions',
};

export type OuterJoin<T> = { [key in keyof T]: T[key] | null };

export type ITableUsers = {
  user_id: number;
  email: string | null;
  name: string | null;
  mobile: string | null;
  password: string | null;
  confirmed: boolean;
  chat_id: string | null;
};

export type ITableUsersTokens = {
  user_id: number;
  token: string;
};

export type ITableSessions = {
  session_id: number;
  user_id: number;
  session_key: string;
  session_value: string;
  updated: string;
};
