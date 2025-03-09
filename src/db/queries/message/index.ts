import { ITableMessages } from '../../../domain/types/db.types';
import { TQuery } from '../../types/types';

const INTERVAL = +(process.env.NOTIFICATION_INTERVAL || 0);

export interface IQueriesMessage {
  get: TQuery<[['subject', string]], ITableMessages>;
  update: TQuery<
    [
      ['message_id', number],
      ['subject', string],
      ['content', string],
      ['date', Date],
    ],
    ITableMessages
  >;
  remove: TQuery<[['subject', string]]>;
  removeOld: TQuery<[]>;
}

export const get = `
  SELECT *
  FROM messages m
  WHERE
    m.subject = $1;
`;

export const update = `
  INSERT INTO messages AS m (
    message_id,
    subject,
    content,
    date
  )
  VALUES ($1, $2, $3, $4)
  ON CONFLICT (message_id)
    DO UPDATE
    SET
      content = $3,
      date = $4
  WHERE
    m.message_id = $1
  RETURNING *;
`;

export const remove = `
  DELETE
  FROM messages
  WHERE
    subject = $1;
`;

export const removeOld = `
  DELETE FROM messages
  WHERE date + interval '${INTERVAL * 4} second'< now();
`;
