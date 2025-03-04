import { ITableSubscriptions } from '../../../domain/types/db.types';
import { TQuery } from '../../types/types';
import { IQueriesSubscriptionSend } from './send';

export interface IQueriesSubscription {
  get: TQuery<[['user_id', number]], ITableSubscriptions>;
  update: TQuery<[['user_id', number], ['type', string]], ITableSubscriptions>;
  remove: TQuery<[['user_id', number]]>;
  send: IQueriesSubscriptionSend;
}

export const get = `
  SELECT * FROM subscriptions
  WHERE user_id = $1;
`;

export const update = `
  INSERT INTO subscriptions AS ss (
    user_id,
    type
  )
  VALUES ($1, $2)
  ON CONFLICT (user_id)
    DO UPDATE
    SET
      type = $2
    WHERE
      ss.user_id = $1
`;

export const remove = `
  DELETE FROM subscriptions
  WHERE user_id = $1;
`;
