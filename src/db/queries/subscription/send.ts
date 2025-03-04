import { ITableUsers } from '../../../domain/types/db.types';
import { TQuery } from '../../types/types';

export interface IQueriesSubscriptionSend {
  onUpdate: TQuery<[], ITableUsers>;
  inPeriod: TQuery<[], ITableUsers>;
  register: TQuery<[['user_id', number]]>;
}

export const onUpdate = `
  SELECT *
  FROM users u
  JOIN subscriptions as ss ON
    ss.user_id = u.user_id
  WHERE
    ss.type = 'ON_UPDATE'
`;

export const inPeriod = `
  SELECT * FROM users u
  JOIN subscriptions s ON
    s.user_id  = u.user_id
  WHERE
    s.sent_date ISNULL OR
    now() > s.sent_date +
      CASE
        WHEN s."type" = 'ONE_WEEK' THEN interval '10 seconds'
        ELSE CASE
          WHEN s."type" = 'TWO_WEEK' THEN interval '20 seconds'
          ELSE interval '40 seconds'
        END
      END;
`;

export const register = `
  UPDATE subscriptions
  SET sent_date = now()
  WHERE user_id = $1;
`;
