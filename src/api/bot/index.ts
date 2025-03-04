import Joi from 'joi';
import { THandler } from '../../controller/types';

export const message: THandler<
  { chatId: string; message_id: number; text: string },
  boolean
> = async (_, { message_id, text }) => {
  new domain.events.Events().setMessage(message_id, text);
  return true;
};
message.responseSchema = Joi.boolean();
message.allowedForUser = 'NOT_LOGGEDIN';
