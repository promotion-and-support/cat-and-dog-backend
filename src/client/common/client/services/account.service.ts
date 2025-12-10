import { INIT_DATA, IS_DEV } from '../../../local/imports';
import * as T from '../../server/types/types';
import { Store } from '../lib/store/store';
import { App } from '../app';
import { Messenger } from './messenger.service';

interface AccountState {
  user: T.IUserResponse;
}

export class Account extends Store<AccountState> {
  private tg: WebApp;
  private messenger: Messenger;

  constructor(private app: App) {
    super({ user: null }, undefined, 'INIT');
    this.messenger = new Messenger(app);
    const { initData } = Telegram.WebApp;
    if (initData) {
      this.tg = Telegram.WebApp;
    } else {
      this.tg = { initData: INIT_DATA } as WebApp;
    }
  }

  getState() {
    return {
      ...this.state,
      tg: this.tg,
      bot: this.messenger.getState(),
    };
  }

  async init() {
    await this.messenger.init();
    if (IS_DEV) {
      const user = await this.app.api.user.read();
      if (user) {
        return this.setState({ user });
      }
    }
    await this.login();
    if (!this.$state.user) {
      await this.signupTg();
    }
  }

  async signupTg() {
    const { initData } = this.tg;
    const user = await this.app.api.account.signup_tg({ initData });
    if (user) {
      this.setState({ user });
    }
  }

  async login() {
    const { initData } = this.tg;
    const user = await this.app.api.account.login_tg({ initData });
    if (user) {
      this.setState({ user });
    }
  }

  async logoutOrRemove(type: 'logout' | 'remove') {
    const success = await this.app.api.account[type]();
    if (success) {
      this.setState({ user: null });
    }
    return success;
  }
}
