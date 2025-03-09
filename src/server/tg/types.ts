import { Api, Bot, Context } from 'grammy';

export interface ITgConfig {
  path: string;
  token: string;
}

export type ITgServer = Bot<Context, Api>;
