import { Readable } from 'node:stream';
import { IConnectionService } from '../../server/types';
import { ITableUsers } from '../../domain/types/db.types';
// eslint-disable-next-line max-len
import { SubscriptionSubjectKeys } from '../../client/common/server/types/subscription.types';

export class NotificationService {
  private tg: IConnectionService;
  private tgStream: Readable &
    AsyncIterable<{ user: ITableUsers; subject: SubscriptionSubjectKeys }>;
  private messages = {
    REPORT: { id: 0, message: '' },
    URGENT: { id: 0, message: '' },
  };

  constructor() {
    this.tg = messengerService;
    this.tgStream = new Readable({ read: () => true, objectMode: true });
    this.sendingToTelegram();
  }

  private async sendingToTelegram() {
    for await (const { user, subject } of this.tgStream) {
      const { message } = this.messages[subject];
      if (!message) {
        continue;
      }
      const { user_id, chat_id } = user;
      // logger.warn('SEND TO TELEGRAM', user);
      const success = await this.tg!.sendNotification(chat_id!, message);
      if (success) {
        await execQuery.subscription.send
          .register([subject, user_id])
          .catch(logger.error.bind(logger));
      } else {
        logger.warn("CANT'T SEND TO TELEGRAM", user_id);
      }
    }
  }

  setMessage(
    subject: SubscriptionSubjectKeys,
    message_id: number,
    message: string,
  ) {
    const messageBySubject = this.messages[subject];
    if (!messageBySubject) {
      return;
    }
    if (message_id < messageBySubject.id) {
      return false;
    }
    messageBySubject.id = message_id;
    messageBySubject.message = message;
    return true;
  }

  async sendForUsers(subject: SubscriptionSubjectKeys, users: ITableUsers[]) {
    for (const user of users) {
      this.tgStream.push({ subject, user });
    }
  }
}

export default () => new NotificationService();
