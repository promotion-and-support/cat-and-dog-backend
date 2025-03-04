export class Events {
  private notifService = notificationService;

  setMessage(message_id: number, text: string) {
    const result = this.notifService.setMessage(message_id, text);
    if (!result) {
      return;
    }
    this.sendOnUpdate();
  }

  async sendOnUpdate() {
    const usersOnUpdate = await execQuery.subscription.send.onUpdate([]);
    this.notifService.sendForUsers(usersOnUpdate);
  }

  async sendInPeriod() {
    const usersInPeriod = await execQuery.subscription.send.inPeriod([]);
    this.notifService.sendForUsers(usersInPeriod);
  }
}
