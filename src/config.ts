/* eslint-disable max-lines */
import { resolve } from 'node:path';
import { IConfig } from './types/config.types';
import { BUILD_SRC_PATH } from './constants/constants';
import { createPathResolve } from './utils/utils';
import { getEnv } from './utils/env.utils';

const resolvePath = createPathResolve(BUILD_SRC_PATH);
const {
  TRANSPORT: transport,
  HOST: host,
  PORT: port,
  DATABASE_URL: dbUrl,
  STATIC_PATH: staticPath,
  LOGGER_COLORIZE: colorize,
  MAIL: mail,
  MAIL_HOST: mailHost,
  MAIL_PORT: mailPort,
  MAIL_USER: mailUser,
  MAIL_PASSWORD: mailPass,
  ...restEnv
} = getEnv();
const connection = {
  heroku: {
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  },
  local: {
    host,
    port: 5432,
    database: 'cat_and_dog',
    user: 'cat_and_dog',
    password: 'cat_and_dog',
  },
}[dbUrl ? 'heroku' : 'local'];

const mailConfig = {
  google: {
    auth: {
      user: 'm.vaskivnyuk@gmail.com',
      pass: mailPass,
    },
  },
  elastic: {
    host: mailHost,
    port: mailPort,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  },
}[mail || 'google'];

const config: IConfig = {
  env: restEnv,
  logger: {
    path: resolvePath('logger/logger'),
    level: 'DEBUG',
    target: 'console',
    colorize,
  },
  database: {
    path: resolvePath('db/db'),
    queriesPath: resolvePath('db/queries'),
    connectionPath: resolvePath('db/connection/pg'),
    connection,
  },
  controller: {
    path: resolvePath('controller/controller'),
    apiPath: resolvePath('api'),
    servicesPath: resolvePath('services'),
    modulesPath: resolvePath('controller/modules'),
    clientApiPath: resolve('src/client/common/server/client.api.ts'),
    services: ['mailService', 'notificationService'],
    inputModules: [
      'setSession',
      'checkAuthorized',
      'getStream',
      'validateInput',
    ],
    outputModules: ['validateOutput'],
    modulesConfig: {
      mailService: mailConfig,
    },
    tasks: [
      {
        path: 'subscription/sending',
        params: {},
        interval: 5_000,
      },
    ],
  },
  inConnection: {
    transport,
    http: {
      path: resolvePath('server/http/http'),
      modulesPath: resolvePath('server/http/modules'),
      staticPath: resolve(staticPath),
      apiPathname: 'api',
      reqModules: ['allowCors', 'setSession', 'staticServer', 'getOperation'],
      resModules: ['sendResponse'],
      host,
      port,
    },
    ws: {
      path: resolvePath('server/ws/ws'),
      modulesPath: resolvePath('server/ws/modules'),
      resModules: ['sendResponse'],
    },
    link: {
      path: resolvePath('server/link/link'),
    },
    tg: {
      path: resolvePath('server/tg/tg'),
      token: restEnv.TG_BOT_TOKEN,
      user_name: restEnv.TG_BOT,
      origin: restEnv.ORIGIN,
      dev: restEnv.DEV,
    },
  },
};

export = config;
