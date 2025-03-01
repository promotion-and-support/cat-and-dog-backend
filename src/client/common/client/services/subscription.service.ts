import * as T from '../../server/types/types';
import { Store } from '../lib/store/store';
import { IApp } from '../app';

interface SubscriptionState {
  subscription: T.IGetSubscription;
}

export class Subscription extends Store<SubscriptionState> {
  constructor(private app: IApp) {
    super({ subscription: null }, undefined, 'INIT');
  }

  async init() {
    await this.read();
  }

  async read() {
    const subscription = (await this.app.api.subscription.get()) as T.IGetSubscription;
    this.setState({ subscription });
  }

  async update(subscription: T.IUpdateSubscription) {
    await this.app.api.subscription.update(subscription);
    this.setState({ subscription });
  }

  async remove() {
    await this.app.api.subscription.remove();
    this.setState({ subscription: null });
  }
}
