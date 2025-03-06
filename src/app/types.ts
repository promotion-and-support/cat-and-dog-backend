import { IConfig } from '../types/config.types';
import { ILogger } from '../logger/types';
import { IDatabase, IDatabaseQueries } from '../db/types/types';
import { IController } from '../controller/types';
import { IInputConnection, IConnectionService } from '../server/types';
import { IMailService } from '../services/mail/types';
import { NotificationService } from '../services/notification/notification';
import { IDomain } from '../domain';
import App from './app';

export type IAppThis = App & {
  config: IConfig;
  logger?: ILogger;
  controller?: IController;
  server?: IInputConnection;
  apiServer?: IInputConnection;
  shutdown: () => Promise<void>;
  setInputConnection: () => Promise<IAppThis>;
};

export interface IControllerContext {
  execQuery: IDatabaseQueries;
  startTransaction: IDatabase['startTransaction'];
  logger: ILogger;
  connectionService: IConnectionService;
  messengerService: IConnectionService;
  console?: typeof console;
  env?: IConfig['env'];
}

export interface IGlobalMixins {
  execQuery: IDatabaseQueries;
  startTransaction: IDatabase['startTransaction'];
  logger: ILogger;
  connectionService: IConnectionService;
  messengerService: IConnectionService;
  cryptoService: typeof import('../utils/crypto');
  mailService: IMailService;
  env: IConfig['env'];
  domain: IDomain;
}

declare global {
  const execQuery: IDatabaseQueries;
  const startTransaction: IDatabase['startTransaction'];
  const logger: ILogger;
  const connectionService: IConnectionService;
  const messengerService: IConnectionService;
  const cryptoService: typeof import('../utils/crypto');
  const mailService: IMailService;
  const notificationService: NotificationService;
  const env: IConfig['env'];
  const domain: IDomain;
}
