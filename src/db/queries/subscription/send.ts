/* eslint-disable max-len */
import { ITableUsers } from '../../../domain/types/db.types';
import { TQuery } from '../../types/types';

const INTERVAL = +(process.env.NOTIFICATION_INTERVAL || 0);

export interface IQueriesSubscriptionSend {
  toUsers: TQuery<[['subject', string], ['message_date', Date]], ITableUsers>;
  register: TQuery<
    [['subject', string], ['user_id', number], ['message_date', Date]]
  >;
}

export const toUsers = `
  SELECT * FROM users u
  JOIN subscriptions ss ON
    ss.user_id  = u.user_id
  WHERE
    ss.subject = $1 AND
     
    CASE
      WHEN ss.type = 'ONE_WEEK' THEN now() > ss.sent_date + interval '${INTERVAL} seconds'
      ELSE CASE
        WHEN ss.type = 'TWO_WEEK' THEN now() > ss.sent_date + interval '${INTERVAL * 2} seconds'
        ELSE CASE
          WHEN ss.type = 'ONE_MONTH' THEN now() > ss.sent_date + interval '${INTERVAL * 4} seconds'
          ELSE ss.message_date < $2
        END
      END
    END;
`;

export const register = `
  UPDATE subscriptions
  SET
    sent_date = now(),
    message_date = $3
  WHERE
    subject = $1 AND
    user_id = $2;
`;
