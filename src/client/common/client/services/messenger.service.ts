import { App } from '../app';
import { Store } from '../lib/store/store';

export class Messenger extends Store {
  private botName = '';

  constructor(private app: App) {
    super({});
  }

  async init() {
    this.botName = (await this.getBotName()) || '';
  }

  getState() {
    return this.botName;
  }

  // async getLink() {
  //   try {
  //     const token = await this.app.api.account.messenger.link.get();
  //     return token;
  //   } catch (e: any) {
  //     this.setError(e);
  //   }
  // }

  async getBotName() {
    try {
      const name = await this.app.api.account.messenger.get.name();
      return name;
    } catch (e: any) {
      this.setError(e);
    }
  }
}
