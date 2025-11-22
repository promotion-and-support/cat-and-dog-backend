import * as T from '../server/types/types';
import { IClientApi } from '../server/client.api';
import { Store } from './lib/store/store';
import { Account } from './services/account.service';
import { Subscription } from './services/subscription.service';
import { Api } from './services/api.service';
import { Net } from './services/net.service';

export interface IApp extends Store<AppState> {
  apiService: Api;
  api: IClientApi;
  account: Account;
  subscription: Subscription;
  net: Net;
}

interface AppState {
  userStatus: T.UserStatusKeys;
}

const INITIAL_STATE: AppState = {
  userStatus: 'NOT_LOGGEDIN',
};

export class App extends Store<AppState> {
  apiService: Api = new Api();
  account: Account = new Account(this);
  subscription: Subscription = new Subscription(this);
  net: Net = new Net(this);

  constructor() {
    super(INITIAL_STATE, undefined, 'INIT');
    this.account.subscribe(() => this.onNewUser(), ['user']);
    this.net.subscribe(() => this.onNewNet(), ['userNet']);
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

  getState() {
    return {
      // status: this.status,
      // error: this.error,
      ...this.account.state,
      userStatus: this.state.userStatus,
      // ...this.userNets.getUserNets(),
      // events: this.userEvents.getEvents(),
      ...this.net.state,
      // ...this.chat.getChatState(),
    };
  }

  private setInitialValues() {
    // this.userNets = new UserNets(this as any);
    // this.chat = new Chat(this as any);
    // this.userEvents = new Events(this as any);
  }

  private setUserStatus() {
    const { user } = this.account.state;
    if (!user) {
      this.setState({ userStatus: 'NOT_LOGGEDIN' });
      return;
    }
    const { userNet: net, userNetData } = this.net.state;
    if (!net) {
      this.setState({ userStatus: user.user_status });
      return;
    }
    const { confirmed } = userNetData || {};
    if (confirmed) this.setState({ userStatus: 'INSIDE_NET' });
    else this.setState({ userStatus: 'INVITING' });
  }

  private onNewUser() {
    const { user } = this.account.state;
    if (!user) this.setInitialValues();
    else if (user.user_status === 'LOGGEDIN') {
      // await this.onNewNets();
      // readChanges && (await this.userEvents.read(true));
    }
    this.setUserStatus();
    // this.emit('user', user);
  }

  private onNewNet() {
    // this.userNets.getNets();
    this.setUserStatus();
  }
}
