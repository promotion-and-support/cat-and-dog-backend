/* eslint-disable indent */
import { TInputModule } from '../types';
import { USER_STATUS_MAP } from '../../client/common/server/types/types';
import { HandlerError } from '../errors';

const checkAuthorized: TInputModule =
  () =>
  async ({ ...operation }, { session }, handler) => {
    if (operation.options.isAdmin) return operation;
    const user_status = session.read('user_status') || 'NOT_LOGGED_IN';
    const userStatus = USER_STATUS_MAP[user_status];
    if (userStatus >= USER_STATUS_MAP.LOGGED_IN) return operation;
    const { allowedForUser } = handler || {};
    if (allowedForUser === 'NOT_LOGGED_IN') return operation;
    if (user_status === 'NOT_LOGGED_IN') throw new HandlerError('UNAUTHORIZED');
    if (allowedForUser === 'NOT_CONFIRMED') return operation;
    throw new HandlerError('NOT_CONFIRMED');
  };

export default checkAuthorized;
