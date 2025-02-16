import Joi from 'joi';
import { THandler } from '../../controller/types';

const logout: THandler<never, boolean> = async ({ session }) => {
  await session.clear();
  return true;
};
logout.responseSchema = Joi.boolean();
logout.allowedForUser = 'NOT_LOGGEDIN';

export = logout;
