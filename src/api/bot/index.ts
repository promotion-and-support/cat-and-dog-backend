import Joi from 'joi';
import { Message } from 'grammy/types';
import { THandler } from '../../controller/types';

export const message: THandler<
  { chatId: string; message: Record<string, string> },
  boolean
> = async (_, { chatId, message }) => {
  const [isOwner] = await execQuery.role.getByChatIdAndRole([chatId, 'OWNER']);

  if (!isOwner) {
    return false;
  }

  return new domain.events.Events().setMessage(message as unknown as Message);
};
message.responseSchema = Joi.boolean();
