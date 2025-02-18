import { GetParamsTypes } from '../../types/types';
import { IQueriesUser } from '../queries/user';
import { IQueriesSession } from '../queries/session';

export interface IDatabaseConfig {
  path: string;
  queriesPath: string;
  connectionPath: string;
  connection: Partial<{
    connectionString: string;
    ssl: {
      rejectUnauthorized: boolean;
    };
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  }>;
}

export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): void;
  query<T extends any[]>(sql: string, params: T): Promise<any>;
  getTransactionConnection: () => Promise<ITransactionConnection>;
}

export interface ITransactionConnection {
  query<T extends any[]>(sql: string, params: T): Promise<any>;
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
}

export interface IDatabase {
  init(): Promise<this>;
  disconnect(): void;
  getQueries(): IDatabaseQueries;
  startTransaction(): Promise<ITransaction>;
}

export interface ITransaction {
  commit: () => Promise<void>;
  rollback: () => Promise<void>;
  execQuery: IDatabaseQueries;
}

export interface IDatabaseQueries {
  user: IQueriesUser;
  session: IQueriesSession;
}

export interface IQueries {
  [key: string]: TQuery | IQueries;
}

export type TQuery<
  T extends [string, any][] = [string, any][],
  Q extends Record<string, any> = Record<string, any>,
> = (
  params: GetParamsTypes<T>,
  connection?: Pick<IDatabaseConnection, 'query'>,
) => Promise<Q[]>;

export type TQueriesModule = Record<string, string> | string;
