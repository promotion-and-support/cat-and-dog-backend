import { env } from 'node:process';
import { readFileSync } from 'node:fs';
import { CleanedEnvKeys, ICleanedEnv } from '../types/config.types';
import { SyncCalc } from './calc';

export const getEnv = () => {
  const DEV = env.NODE_ENV === 'development';
  const TEST = env.NODE_ENV === 'test';
  new SyncCalc('.env.json')
    .next(readFileSync)
    .next(String)
    .next(JSON.parse)
    .next(Object.assign.bind(null, env));

  const {
    TRANSPORT = 'ws',
    HOST = 'localhost',
    PORT = 8000,
    DATABASE_URL = '',
    RUN_ONCE = false,
    STATIC_UNAVAILABLE = false,
    API_UNAVAILABLE = false,
    EXIT_ON_ERROR = false,
    MAIL_CONFIRM_OFF = false,
    TG_BOT = 'u_n_w_bot',
    TG_BOT_TOKEN = '',
    ORIGIN = DEV ? `http://localhost:${PORT}` : 'https://merega.herokuapp.com',
    STATIC_PATH = 'public',
    LOGGER_COLORIZE = false,
    MAIL = 'google',
    MAIL_HOST = '',
    MAIL_PORT = 2525,
    MAIL_USER = '',
    MAIL_PASSWORD = '',
    INVITE_CONFIRM = false,
    NOTIFICATION_INTERVAL = 0,
  } = env as Record<CleanedEnvKeys, any>;

  const cleanedEnvObj: ICleanedEnv = {
    DEV,
    TEST,
    TRANSPORT,
    HOST,
    PORT: +PORT,
    DATABASE_URL,
    RUN_ONCE,
    STATIC_UNAVAILABLE,
    API_UNAVAILABLE,
    EXIT_ON_ERROR,
    MAIL_CONFIRM_OFF,
    TG_BOT,
    TG_BOT_TOKEN,
    ORIGIN,
    STATIC_PATH,
    LOGGER_COLORIZE,
    MAIL,
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USER,
    MAIL_PASSWORD,
    INVITE_CONFIRM,
    NOTIFICATION_INTERVAL,
  };

  return cleanedEnvObj;
};
