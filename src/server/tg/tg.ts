import { env } from 'node:process';
import { Bot, BotError, Context, InlineKeyboard } from 'grammy';
import { THandleOperation } from '../../types/operation.types';
import { IInputConnection } from '../types';
import { ITgConfig, ITgServer } from './types';
import { ServerError } from '../errors';
import { getOparation } from './getOperation';
import { greeting, forbidden } from './reply';

class TgConnection implements IInputConnection {
  private exec?: THandleOperation;
  private server: ITgServer;
  private origin = env.ORIGIN || 'https://example.com';

  constructor(private config: ITgConfig) {
    this.server = new Bot(this.config.token);
    this.server.on('message', this.handleRequest.bind(this));
    this.server.on('edit', this.handleRequest.bind(this));
    this.server.catch(this.handleError.bind(this));
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

    // logger.info('SET MENU BUTTON');
    // await this.server.api
    //   .setChatMenuButton({
    //     // menu_button: { type: 'default' },
    //     menu_button: {
    //       type: 'web_app',
    //       text: 'OPEN',
    //       web_app: { url: this.origin },
    //     },
    //   })
    //   .catch(logger.error);
  }

  async stop() {
    return this.server.stop();
  }

  private async handleRequest(ctx: Context) {
    const { operation, url } = getOparation(ctx, this.origin) || {};

    if (url) {
      const inlineKyeboard = new InlineKeyboard([
        [{ text: 'OPEN', web_app: { url } }],
      ]);
      return ctx.reply('Для завершення дії натисніть OPEN', {
        reply_markup: inlineKyeboard,
      });
    }

    if (operation) {
      try {
        const result = await this.exec!(operation);
        if (result) {
          return; // ctx.reply('Відправлено');
        } else {
          forbidden(ctx);
        }
      } catch (e) {
        ctx.reply('Сталася помилка!');
      }
      return;
    }

    greeting(ctx);
  }

  private async sendNotification(
    chatId: string,
    text = '',
    other: Record<string, any> = {},
  ) {
    if (text || Object.keys(other).length) {
      try {
        await this.server.api.sendMessage(chatId, text, {
          parse_mode: 'HTML',
          ...other,
        });
        return true;
      } catch (e) {
        logger.warn(e);
        return false;
      }
    }

    const appName = 'Cat & Dog';
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
