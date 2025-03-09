import { Message } from 'grammy/types';
// eslint-disable-next-line max-len
import { SubscriptionSubjectKeys } from '../../client/common/server/types/subscription.types';
import { ITableMessages, ITableUsers } from '../types/db.types';

const SUBJECT_BY_TEG: Record<string, SubscriptionSubjectKeys> = {
  '#news': 'URGENT',
  '#новини': 'URGENT',
  '#report': 'REPORT',
  '#звіт': 'REPORT',
};

export class Events {
  private notifService = notificationService;

  async setMessage(message: Message) {
    const { message_id, text: t = '', edit_date, date, chat } = message;

    let text = t;
    if (!text) {
      return false;
    }

    const [tag] = text!.split(/\s/);
    const subject = tag && SUBJECT_BY_TEG[tag.toLocaleLowerCase()];

    if (!subject) {
      if (chat.id) {
        this.echo(chat.id, text);
        return true;
      }
      return false;
    }

    const [savedMessage] = await execQuery.message.get([subject]);
    if (savedMessage && savedMessage.message_id > message_id) {
      return false;
    }
    await execQuery.message.remove([subject]);

    text = text.replace(RegExp(`^${tag}\\s`), `${tag}\n`);
    await execQuery.message.update([
      message_id,
      subject,
      text,
      new Date((edit_date || date) * 1000),
    ]);

    this.sendMessage(subject);

    return true;
  }

  echo(chatId: number, text: string) {
    let content = text!.replace(RegExp(`^#test\\s`, 'i'), `#test\n`);
    content = text!.replace(RegExp(`^#тест\\s`, 'i'), `#тест\n`);
    const user = { chat_id: chatId.toString() } as ITableUsers;
    const message = { content } as ITableMessages;
    this.notifService.sendForUsers([user], message);
  }

  async sendMessage(subject: SubscriptionSubjectKeys) {
    await execQuery.message.removeOld([]);
    const [message] = await execQuery.message.get([subject]);
    if (!message?.content) {
      return;
    }

    const users = await execQuery.subscription.send.toUsers([
      subject,
      message.date,
    ]);
    this.notifService.sendForUsers(users, message);
  }
}
