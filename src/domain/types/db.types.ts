export const TABLES_MAP = {
  USERS: 'users',
  USERS_TOKENS: 'users_tokens',
  SESSIONS: 'sessions',
  SUBSCRIPTIONS: 'subscriptions',
  MESSAGES: 'messages',
  ROLES: 'roles',
  USERS_ROLES: 'users_roles',
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
  updated: Date;
};

export type ITableRoles = {
  role_id: number;
  name: string;
};

export type ITableUsersRoles = {
  user_id: number;
  role_id: number;
};

export type ITableMessages = {
  message_id: number;
  subject: string;
  content: string;
  date: Date;
};

export type ITableSubscriptions = {
  user_id: number;
  type: string;
  date: Date;
  subject: string;
  message_date: Date;
};
