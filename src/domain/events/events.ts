// eslint-disable-next-line max-len
import { SubscriptionSubjectKeys } from '../../client/common/server/types/subscription.types';

const SUBJECT_BY_TEG: Record<string, SubscriptionSubjectKeys> = {
  '#sos': 'URGENT',
};

export class Events {
  private notifService = notificationService;

  setMessage(message_id: number, text: string) {
    const tag = text.split(/\s/)[0];
    const subject = (tag && SUBJECT_BY_TEG[tag]) || 'REPORT';
    const result = this.notifService.setMessage(subject, message_id, text);

    if (!result) {
      return;
    }

    this.sendOnUpdate(subject);
  }

  async sendOnUpdate(subject: SubscriptionSubjectKeys) {
    const usersOnUpdate = await execQuery.subscription.send.onUpdate([subject]);
    this.notifService.sendForUsers(subject, usersOnUpdate);
  }

  async sendInPeriod() {
    const usersInPeriod1 = await execQuery.subscription.send.inPeriod([
      'REPORT',
    ]);
    const usersInPeriod2 = await execQuery.subscription.send.inPeriod([
      'URGENT',
    ]);
    this.notifService.sendForUsers('REPORT', usersInPeriod1);
    this.notifService.sendForUsers('URGENT', usersInPeriod2);
  }
}
