/* eslint-disable max-lines */
import { Bot, BotError, Context, InlineKeyboard } from 'grammy';
import { THandleOperation } from '../../types/operation.types';
import { IInputConnection } from '../types';
import { ITgConfig, ITgServer } from './types';
import { ServerError } from '../errors';
import { getOparation } from './getOperation';

const TEST_URL =
  'https://mykhailo-vaskivnyuk.github.io/telegram-web-app-bot-example/index.html';

class TgConnection implements IInputConnection {
  private exec?: THandleOperation;
  private server: ITgServer;
  private origin: string;

  constructor(private config: ITgConfig) {
    this.server = new Bot(config.token);
    this.server.on('message', this.handleRequest.bind(this));
    this.server.catch(this.handleError.bind(this));
    this.origin = this.config.origin || 'https://example.com';
    // this.server.api.setChatMenuButton();
    // this.server.callbackQuery('open-app', () => console.log('HERE'));
  }

  onOperation(cb: THandleOperation) {
    this.exec = cb;
  }

  setUnavailable() {
    return;
  }

  getServer() {
    return this.server;
  }

  async start() {
    if (!this.exec) {
      const e = new ServerError('NO_CALLBACK');
      logger.error(e);
      throw e;
    }

    try {
      await new Promise((onStart, onError) => {
        this.server.start({ onStart }).catch(onError);
      });
    } catch (e: any) {
      logger.error(e);
      throw new ServerError('LISTEN_ERROR');
    }
  }

  async stop() {
    return this.server.stop();
  }

  private async handleRequest(ctx: Context) {
    const { operation, url } = getOparation(ctx, this.origin) || {};

    if (url) {
      const inlineKyeboard = new InlineKeyboard([
        [{ text: url, web_app: { url } }],
      ]);
      return ctx.reply('MENU', { reply_markup: inlineKyeboard });
    }

    if (operation) {
      try {
        const result = await this.exec!(operation);
        if (result) return ctx.reply('success');
        else return ctx.reply('bad command');
      } catch (e) {
        return ctx.reply('error');
      }
    }

    const testBtn = [{ text: 'Open TestApp', web_app: { url: TEST_URL } }];
    const btns = [[{ text: this.origin, web_app: { url: this.origin } }]];
    if (this.config.dev) btns.push(testBtn);
    const inlineKyeboard = new InlineKeyboard(btns);
    return ctx.reply('MENU', { reply_markup: inlineKyeboard });
  }

  private async sendNotification(chatId: string) {
    const appName = 'You & World';
    const message = `На сайті ${appName} нові події`;
    const inlineKyeboard = new InlineKeyboard().url(appName, this.origin);
    try {
      await this.server.api.sendMessage(chatId, message, {
        reply_markup: inlineKyeboard,
      });
      return true;
    } catch (e) {
      logger.warn(e);
      return false;
    }
  }

  private handleError(error: BotError) {
    const details = (error.error as any)?.message || {};
    logger.warn(details);
    // throw new ServerError('SERVER_ERROR', details);
  }

  getConnectionService() {
    return {
      sendMessage: () => Promise.resolve(false),
      sendNotification: this.sendNotification.bind(this),
    };
  }
}

export = TgConnection;
