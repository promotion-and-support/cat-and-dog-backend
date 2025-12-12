import * as T from '../../server/types/types';
import { Store } from '../lib/store/store';
import { App } from '../app';

interface SubscriptionServiceState {
  subscriptions: Record<T.SubscriptionSubjectKeys, Record<T.SubscriptionTypeKeys, boolean>>;
}

const getState = (): SubscriptionServiceState['subscriptions'] =>
  ({
    REPORT: {
      ON_UPDATE: false,
      ONE_WEEK: false,
      TWO_WEEK: false,
      ONE_MONTH: false,
    } as const,
    URGENT: {
      ON_UPDATE: false,
      ONE_WEEK: false,
      TWO_WEEK: false,
      ONE_MONTH: false,
    } as const,
  }) as const;

export class Subscription extends Store<SubscriptionServiceState> {
  constructor(private app: App) {
    super({ subscriptions: getState() }, undefined, 'INIT');
  }

  reset() {
    this.setState({ subscriptions: getState() });
  }

  async read() {
    const result = await this.app.api.subscription.get();
    const subscriptions = result.reduce((s, it) => {
      s[it.subject][it.type] = true;
      return s;
    }, getState());
    this.setState({ subscriptions });
  }

  async update(subscription: T.IUpdateSubscription) {
    await this.app.api.subscription.update(subscription);
    await this.read();
  }

  async remove(subscription?: T.IUpdateSubscription) {
    await this.app.api.subscription.remove(subscription || { subject: null });
    await this.read();
  }
}
