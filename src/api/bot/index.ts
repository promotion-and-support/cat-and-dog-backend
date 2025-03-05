import Joi from 'joi';
import { Message } from 'grammy/types';
import { THandler } from '../../controller/types';

export const message: THandler<
  { chatId: string; message: Record<string, string> },
  boolean
> = async (_, { message }) => {
  new domain.events.Events().setMessage(message as unknown as Message);
  return true;
};
message.responseSchema = Joi.boolean();
