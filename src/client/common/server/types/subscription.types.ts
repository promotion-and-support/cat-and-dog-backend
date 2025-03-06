export const SUBSCRIBTION_TYPE = {
  ON_UPDATE: 'immediately',
  ONE_WEEK: '1 week',
  TWO_WEEK: '2 week',
  ONE_MONTH: '1 month',
};
export type SubscriptionTypeKeys = keyof typeof SUBSCRIBTION_TYPE;

export const SUBSCRIBTION_SUBJECT = {
  REPORT: 'report',
  URGENT: 'urgent',
};
export type SubscriptionSubjectKeys = keyof typeof SUBSCRIBTION_SUBJECT;

export type IUpdateSubscription = {
  type: SubscriptionTypeKeys;
  subject: SubscriptionSubjectKeys;
};

export type ISubscription = {
  type: SubscriptionTypeKeys;
  subject: SubscriptionSubjectKeys;
};

export type IGetSubscription = ISubscription[];
