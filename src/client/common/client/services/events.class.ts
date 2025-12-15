import * as T from '../../server/types/types';
import { Store } from '@client/lib/store/store';
import { EventStore } from './event.store.class';
import { App } from '@client/app';

interface EventServiceState {
  netEvents: T.IEvents;
}

export class EventService extends Store<EventServiceState> {
  private lastEvent: T.IEvent;
  private netEventsMap = new Map<number, EventStore>();

  constructor(private app: App) {
    super({ netEvents: [] });
    this.app.userNets.subscribe((s) => this.onAllNets(s.allNets), ['allNets']);
    this.netEventsMap.set(0, new EventStore(0));
  }

  reset() {
    this.clear();
    this.netEventsMap = new Map<number, EventStore>();
    this.netEventsMap.set(0, new EventStore(0));
  }

  private onAllNets(nets: T.INetsResponse) {
    for (const net of nets) {
      const { net_id, parent_net_id } = net;
      if (this.netEventsMap.has(net_id)) continue;
      let parent = this.netEventsMap.get(0);
      if (parent_net_id !== null) {
        parent = this.netEventsMap.get(parent_net_id);
        if (!parent) throw new Error('Parent net is not found');
      }
      const eventStore = new EventStore(net_id);
      this.netEventsMap.set(net_id, eventStore);
      parent!.setChild(eventStore);
      const events = this.$state.netEvents.filter(
        (event) => event.net_view && event.net_id === net_id,
      );
      eventStore.addEvents(events);
    }
  }

  private async setNewEvents(newEvents: T.IEvents) {
    const netEvents = [...this.$state.netEvents, ...newEvents];
    for (const event of newEvents) {
      const { net_id, net_view } = event;
      let eventStore = this.netEventsMap.get(0);
      if (net_view && net_id) {
        eventStore = this.netEventsMap.get(net_id);
      }
      if (!eventStore) throw new Error('eventStore is not found');
      eventStore.addEvents([event]);
    }
    this.setLastEventId(newEvents);
    await this.app.onNewEvents(newEvents);
    this.setState({ netEvents });
  }

  getEvents() {
    return this.netEventsMap;
  }

  setLastEventId(events: T.IEvents) {
    for (const lastEvent of events) {
      if (!lastEvent.event_id) continue;
      this.lastEvent = lastEvent;
    }
  }

  isEventMessage(
    messageData: T.IMessage<T.MessageTypeKeys>,
  ): messageData is T.IMessage<'EVENT' | 'NEW_EVENTS'> {
    return this.isEvent(messageData) || this.isNewEvents(messageData);
  }

  private isEvent(messageData: T.IMessage<T.MessageTypeKeys>): messageData is T.IMessage<'EVENT'> {
    return messageData?.type === 'EVENT';
  }

  private isNewEvents(
    messageData: T.IMessage<T.MessageTypeKeys>,
  ): messageData is T.IMessage<'NEW_EVENTS'> {
    return messageData?.type === 'NEW_EVENTS';
  }

  newEventMessage(messageData: T.IMessage<'EVENT' | 'NEW_EVENTS'>) {
    const { type } = messageData;
    if (type === 'NEW_EVENTS') this.read().catch(() => {});
    else this.add(messageData);
  }

  async read() {
    try {
      const { event_id } = this.lastEvent || {};
      const newEvents = await this.app.api.events.read({ event_id });
      if (newEvents.length) await this.setNewEvents(newEvents);
    } catch (e: any) {
      this.setError(e);
    }
  }

  private add(event: T.IMessage<'EVENT'>) {
    this.setNewEvents([event]).catch(() => {});
  }

  async confirm(event: T.IEvent) {
    try {
      if (!event.event_id) return;
      await this.app.api.events.confirm(event);
    } catch (e: any) {
      this.setError(e);
    } finally {
      this.remove(event);
    }
  }

  remove(event: T.IEvent) {
    const { net_id, net_view } = event;
    let eventStore = this.netEventsMap.get(0);
    if (net_id && net_view) {
      eventStore = this.netEventsMap.get(net_id);
      if (!eventStore) throw new Error('eventStore is not found');
      eventStore.removeEvent(event);
    }
    const netEvents = this.$state.netEvents.filter((v) => event !== v);
    this.setState({ netEvents });
  }

  drop(event: T.IEvent) {
    this.$state.netEvents = this.$state.netEvents.filter((i) => i.event_id !== event.event_id);
  }
}
