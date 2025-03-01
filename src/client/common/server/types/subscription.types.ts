export const SUBSCRIBTION_TYPE = {
  ON_UPDATE: 'immediately',
  ONE_WEEK: '1 week',
  TWO_WEEK: '2 week',
  ONE_MONTH: '1 month',
};
export type SubscriptionTypeKeys = keyof typeof SUBSCRIBTION_TYPE;

export type IUpdateSubscription = {
  type: SubscriptionTypeKeys;
};

export type IGetSubscription = {
  type: SubscriptionTypeKeys;
} | null;
