export * as events from './events/events';

export type IDomain = {
  events: typeof import('./events/events');
};
