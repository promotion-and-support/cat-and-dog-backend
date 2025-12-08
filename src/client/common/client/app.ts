import * as T from '../server/types/types';
import { IClientApi } from '../server/client.api';
import { Store } from './lib/store/store';
import { Account } from './services/account.service';
import { Subscription } from './services/subscription.service';
import { Api } from './services/api.service';
import { Net } from './services/net.service';
import { UserNets } from './services/user.nets.class';
import { EventService } from './services/events.class';

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
  apiService: Api = new Api(this.handleConnect.bind(this), this.setMessage.bind(this));
  account: Account = new Account(this);
  subscription: Subscription = new Subscription(this);
  net: Net = new Net(this);
  userNets: UserNets = new UserNets(this);
  userEvents: EventService = new EventService(this);

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
      ...this.account.getState(),
      userStatus: this.state.userStatus,
      ...this.userNets.state,
      events: this.userEvents.getEvents(),
      ...this.net.state,
      // ...this.chat.getChatState(),
    };
  }

  private handleConnect() {
    // if (this.status === AppStatus.INITING) return;
    const { user_status } = this.getState().user || {};
    if (user_status === 'NOT_LOGGEDIN') return;
    // this.chat.connectAll().catch((e) => this.setError(e));
    this.api.chat.connect.user().catch((e) => this.setError(e));
    this.userEvents.read().catch((e) => this.setError(e));
  }

  private setInitialValues() {
    this.userNets = new UserNets(this);
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

  private async onNewUser() {
    const { user } = this.account.state;
    if (!user) this.setInitialValues();
    else if (user.user_status === 'LOGGEDIN') {
      await this.userNets.getAllNets();
      await this.userNets.getWaitNets();
    }
    this.setUserStatus();
  }

  private onNewNet() {
    // this.userNets.getNets();
    this.setUserStatus();
  }

  async onNewNets() {
    await this.userNets.getAllNets();
    // await this.chat.connectAll();
  }

  async onNewEvents(events: T.IEvents) {
    const { userNet: net } = this.getState();
    const { net_id } = net || {};
    let updateUser = false;
    let updateNet = false;
    for (const event of events) {
      const { net_id: eventNetId, net_view: netView, message } = event;
      if (!eventNetId) {
        updateUser = true;
        break;
      }
      if (net_id === eventNetId || !netView) updateNet = true;
      if (!message) this.userEvents.drop(event);
    }
    if (updateUser) {
      if (net_id) {
        try {
          await this.net.enter(net_id);
        } catch {
          window.location.href = window.location.origin;
          return;
        }
      }
      await this.onNewUser().catch(console.log);
    }
    if (updateNet) await this.net.enter(net_id!).catch(console.log);
    // this.emit('events', this.userEvents.getEvents());
  }

  setMessage<T extends T.MessageTypeKeys>(messageData: T.IMessage<T>) {
    if (!messageData) return;

    if (this.userEvents.isEventMessage(messageData)) {
      return this.userEvents.newEventMessage(messageData);
    }

    // this.chat.setMessage(messageData);
  }
}
