import Joi from 'joi';
import { THandler } from '../../controller/types';
import {
  IUserResponse,
  UserStatusKey,
} from '../../client/common/server/types/types';
import { UserResponseSchema } from '../schema/schema';

const login_tg: THandler<{ initData: string }, IUserResponse> = async (
  { session },
  { initData },
) => {
  const tgUser = cryptoService.verifyTgData(initData);
  if (!tgUser) return null;
  const { id: chat_id } = tgUser;

  const [user] = await execQuery.user.findByChatId([chat_id]);
  if (!user) return null;

  const { user_id, confirmed } = user;
  const user_status: UserStatusKey = confirmed ? 'LOGGED_IN' : 'NOT_CONFIRMED';
  session.write('user_id', user_id);
  session.write('user_status', user_status);
  return { ...user, user_status };
};
login_tg.paramsSchema = { initData: Joi.string().required() };
login_tg.responseSchema = UserResponseSchema;
login_tg.allowedForUser = 'NOT_LOGGED_IN';

export = login_tg;
