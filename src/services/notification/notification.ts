import { Readable } from 'node:stream';
import { IConnectionService } from '../../server/types';
import { ITableUsers } from '../../domain/types/db.types';

export class NotificationService {
  private tg: IConnectionService;
  private tgStream: Readable & AsyncIterable<ITableUsers>;
  private message_id = 0;
  private message = '';

  constructor() {
    this.tg = messengerService;
    this.tgStream = new Readable({ read: () => true, objectMode: true });
    this.sendingToTelegram();
  }

  private async sendingToTelegram() {
    for await (const user of this.tgStream) {
      if (!this.message) {
        continue;
      }
      const { user_id, chat_id } = user;
      // logger.warn('SEND TO TELEGRAM', user);
      const success = await this.tg!.sendNotification(chat_id!, this.message);
      if (success) {
        await execQuery.subscription.send
          .register([user_id])
          .catch(logger.error.bind(logger));
      } else {
        logger.warn("CANT'T SEND TO TELEGRAM", user_id);
      }
    }
  }

  setMessage(message_id: number, message: string) {
    if (message_id < this.message_id) {
      return false;
    }
    this.message_id = message_id;
    this.message = message;
    return true;
  }

  async sendForUsers(users: ITableUsers[]) {
    for (const user of users) {
      this.tgStream.push(user);
    }
  }
}

export default () => new NotificationService();
