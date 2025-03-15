import { Readable } from 'node:stream';
import { IConnectionService } from '../../server/types';
import { ITableMessages, ITableUsers } from '../../domain/types/db.types';

export class NotificationService {
  private tg: IConnectionService;
  private tgStream: Readable &
    AsyncIterable<{ user: ITableUsers; message: ITableMessages }>;

  constructor() {
    this.tg = messengerService;
    this.tgStream = new Readable({ read: () => true, objectMode: true });
    this.sendingToTelegram();
  }

  private async sendingToTelegram() {
    for await (const { user, message } of this.tgStream) {
      const { user_id, chat_id } = user;
      const { subject, content, date: message_date } = message;

      if (!content) {
        continue;
      }

      // logger.warn('SEND TO TELEGRAM', user, content);
      const success = await this.tg!.sendNotification(chat_id!, content);

      if (success) {
        if (!user_id) {
          continue;
        }
        await execQuery.subscription.send
          .register([subject, user_id, message_date])
          .catch(logger.error.bind(logger));
      } else {
        logger.warn("CANT'T SEND TO TELEGRAM", user_id);
      }
    }
  }

  sendForUsers(users: ITableUsers[], message: ITableMessages) {
    for (const user of users) {
      this.tgStream.push({ user, message });
    }
  }
}

export default () => new NotificationService();
