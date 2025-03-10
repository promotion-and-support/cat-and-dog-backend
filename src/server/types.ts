import http from 'node:http';
import { IOperation, TOperationResponse } from '../types/operation.types';
import { IHttpConfig, IHttpServer } from './http/types';
import { IWsConfig, IWsServer } from './ws/types';
import { ILinkConfig } from './link/types';
import { ITgConfig, ITgServer } from './tg/types';

export interface IInputConnectionConfig {
  transport: TTransport;
  http: IHttpConfig;
  ws: IWsConfig;
  link: ILinkConfig;
  tg: ITgConfig;
}
export type TTransport = 'http' | 'ws' | 'link';

export interface IInputConnection {
  start(): Promise<void>;
  stop(): Promise<void>;
  onOperation(cb: (operation: IOperation) => Promise<TOperationResponse>): void;
  setUnavailable(value: boolean): void;
  getServer(): IServer;
  getConnectionService: () => IConnectionService;
}

export type IServer = IHttpServer | IWsServer | ITgServer;
export type IRequest = http.IncomingMessage;
export interface IConnectionService {
  sendMessage: (
    data: Record<string, string>,
    connectionIds?: Set<number>,
  ) => Promise<boolean>;
  sendNotification: (chatId: string, message?: string) => Promise<boolean>;
}
