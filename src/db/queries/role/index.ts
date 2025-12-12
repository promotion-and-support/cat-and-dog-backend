import { ITableRoles } from '../../../domain/types/db.types';
import { TQuery } from '../../types/types';

export interface IQueriesRole {
  setAdmin: TQuery<[['user_id', number]]>;
  removeAdmin: TQuery;
  getByChatId: TQuery<[['chat_id', string]], ITableRoles>;
  getByChatIdAndRole: TQuery<
    [['chat_id', string], ['name', string]],
    ITableRoles
  >;
}

export const setAdmin = `
  INSERT
  INTO users_roles (user_id, role_id)
  VALUES ($1, 1);
`;

export const removeAdmin = `
  DELETE
  FROM users_roles
  WHERE role_id = 1;
`;

export const getByChatId = `
  SELECT r.*
  FROM users_roles ur
  JOIN roles r ON
    r.role_id = ur.role_id
  JOIN users u ON
    u.user_id = ur.user_id
  WHERE
    u.chat_id = $1;
`;

export const getByChatIdAndRole = `
  SELECT r.*
  FROM users_roles ur
  JOIN roles r ON
    r.role_id = ur.role_id
  JOIN users u ON
    u.user_id = ur.user_id
  WHERE
    u.chat_id = $1 AND
    r.name = $2;
`;
