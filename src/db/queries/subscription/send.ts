import { ITableUsers } from '../../../domain/types/db.types';
import { TQuery } from '../../types/types';

export interface IQueriesSubscriptionSend {
  onUpdate: TQuery<[['subject', string]], ITableUsers>;
  inPeriod: TQuery<[['subject', string]], ITableUsers>;
  register: TQuery<
    [['subject', string], ['user_id', number], ['message_date', Date]]
  >;
}

export const onUpdate = `
  SELECT *
  FROM users u
  JOIN subscriptions as ss ON
    ss.user_id = u.user_id
  WHERE
    ss.subject = $1 AND
    ss.type = 'ON_UPDATE';
`;

export const inPeriod = `
  SELECT * FROM users u
  JOIN subscriptions ss ON
    ss.user_id  = u.user_id
  WHERE
    ss.subject = $1 AND
    ss.type <> 'ON_UPDATE' AND (
    ss.sent_date ISNULL OR
    now() > ss.sent_date +
      CASE
        WHEN ss.type = 'ONE_WEEK' THEN interval '10 seconds'
        ELSE CASE
          WHEN ss.type = 'TWO_WEEK' THEN interval '20 seconds'
          ELSE interval '40 seconds'
        END
      END
    );
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
