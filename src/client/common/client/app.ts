import { IClientApi } from '../server/client.api';
import { Store } from './lib/store/store';
import { Account } from './services/account.service';
import { Subscription } from './services/subscription.service';
import { Api } from './services/api.service';

export interface IApp {
  apiService: Api;
  account: Account;
  subscription: Subscription;
  api: IClientApi;
}

export class App extends Store implements IApp {
  apiService: Api = new Api(this);
  account: Account = new Account(this);
  subscription: Subscription = new Subscription(this);

  constructor() {
    super({}, undefined, 'INIT');
  }

  async init() {
    try {
      await this.apiService.init();
      await this.account.init();
      await this.subscription.init();
      this.setState({ status: 'READY' });
    } catch (e: any) {
      this.setError(e);
    }
  }

  get api() {
    return this.apiService.api;
  }
}
