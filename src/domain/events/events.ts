import { Message } from 'grammy/types';
// eslint-disable-next-line max-len
import { SubscriptionSubjectKeys } from '../../client/common/server/types/subscription.types';
import { ITableMessages } from '../types/db.types';

const SUBJECT_BY_TEG: Record<string, SubscriptionSubjectKeys> = {
  '#sos': 'URGENT',
};

export class Events {
  private notifService = notificationService;

  async setMessage(message: Message) {
    const { message_id, text, edit_date, date } = message;

    const tag = text!.split(/\s/)[0];
    const subject = (tag && SUBJECT_BY_TEG[tag]) || 'REPORT';

    const [savedMessage] = await execQuery.message.get([subject]);
    if (savedMessage && savedMessage.message_id > message_id) {
      return false;
    }
    await execQuery.message.remove([subject]);

    const [newMessage] = await execQuery.message.update([
      message_id,
      subject,
      text || '',
      new Date((edit_date || date) * 1000),
    ]);

    this.sendOnUpdate(newMessage!);
    return true;
  }

  async sendOnUpdate(message: ITableMessages) {
    const usersOnUpdate = await execQuery.subscription.send.onUpdate([
      message.subject,
    ]);
    this.notifService.sendForUsers(usersOnUpdate, message);
  }

  async sendInPeriod() {
    const [message] = await execQuery.message.get(['REPORT']);
    if (message?.content) {
      const users = await execQuery.subscription.send.inPeriod(['REPORT']);
      this.notifService.sendForUsers(users, message);
    }
  }
}
