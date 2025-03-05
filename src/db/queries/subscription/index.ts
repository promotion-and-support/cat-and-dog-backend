import { ITableSubscriptions } from '../../../domain/types/db.types';
import { TQuery } from '../../types/types';
import { IQueriesSubscriptionSend } from './send';

export interface IQueriesSubscription {
  get: TQuery<[['user_id', number]], ITableSubscriptions>;
  update: TQuery<[['user_id', number], ['type', string], ['subject', string]]>;
  remove: TQuery<[['user_id', number], ['subject', string | null]]>;
  send: IQueriesSubscriptionSend;
}

export const get = `
  SELECT * FROM subscriptions
  WHERE user_id = $1;
`;

export const update = `
  INSERT INTO subscriptions AS ss (
    user_id,
    type,
    subject
  )
  VALUES ($1, $2, $3)
  ON CONFLICT (user_id, subject)
    DO UPDATE
    SET
      type = $2
    WHERE
      ss.user_id = $1 AND
      ss.subject = $3
`;

export const remove = `
  DELETE FROM subscriptions
  WHERE
    user_id = $1 AND (
      $2::varchar ISNULL OR
      subject = $2
    );
`;
