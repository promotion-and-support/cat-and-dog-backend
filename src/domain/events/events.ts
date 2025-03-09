import { Message } from 'grammy/types';
// eslint-disable-next-line max-len
import { SubscriptionSubjectKeys } from '../../client/common/server/types/subscription.types';
import { ITableMessages, ITableUsers } from '../types/db.types';

const SUBJECT_BY_TEG: Record<string, SubscriptionSubjectKeys> = {
  '#новини': 'URGENT',
  '#звіт': 'REPORT',
  '#news': 'URGENT',
  '#report': 'REPORT',
};

export class Events {
  private notifService = notificationService;

  async setMessage(message: Message) {
    const { message_id, text: t, edit_date, date, chat } = message;
    let text = t;
    const [tag] = text!.split(/\s/);
    const subject = tag && SUBJECT_BY_TEG[tag.toLocaleLowerCase()];
    if (!subject) {
      if (!chat.id) {
        return false;
      }
      text = text!.replace(RegExp(`^#test\\s`, 'i'), `#test\n`);
      text = text!.replace(RegExp(`^#тест\\s`, 'i'), `#тест\n`);
      this.echo(
        { chat_id: chat.id.toString() } as ITableUsers,
        { content: text } as ITableMessages,
      );
      return true;
    }

    text = text!.replace(RegExp(`^${tag}\\s`), `${tag}\n`);

    // if (subject === 'REPORT') {
    //   text = `<b><i>ЗВІТ</i></b>\n${text}`;
    // } else {
    //   text = text!.replace(/#news\s/, `<b><i>НОВИНИ</i></b>\n`);

    // }

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

  echo(user: ITableUsers, message: ITableMessages) {
    this.notifService.sendForUsers([user], message);
  }

  async sendOnUpdate(message: ITableMessages) {
    const usersOnUpdate = await execQuery.subscription.send.onUpdate([
      message.subject,
    ]);
    this.notifService.sendForUsers(usersOnUpdate, message);
  }

  async sendInPeriod() {
    await execQuery.message.removeOld([]);
    const [message] = await execQuery.message.get(['REPORT']);
    if (message?.content) {
      const users = await execQuery.subscription.send.inPeriod(['REPORT']);
      this.notifService.sendForUsers(users, message);
    }
  }
}
