import Joi from 'joi';
import { IUserResponse } from '../../client/common/server/types/types';
import { THandler } from '../../controller/types';
import { UserResponseSchema } from '../schema/schema';

const signup_tg: THandler<{ initData: string }, IUserResponse> = async (
  { session },
  { initData },
) => {
  const tgUser = cryptoService.verifyTgData(initData);
  if (!tgUser) return null;
  const { id: chat_id, username, first_name, last_name } = tgUser;

  const [userExists] = await execQuery.user.findByChatId([chat_id]);
  if (userExists) return null;

  const name = `${first_name} ${last_name}`.trim() || username || null;
  const [user] = await execQuery.user.createByChatId([name, chat_id]);
  const { user_id } = user!;
  const user_status = 'LOGGEDIN';
  session.write('user_id', user_id);
  session.write('user_status', user_status);
  return { ...user!, user_status };
};
signup_tg.paramsSchema = { initData: Joi.string().required() };
signup_tg.responseSchema = UserResponseSchema;
signup_tg.allowedForUser = 'NOT_LOGGEDIN';

export = signup_tg;
