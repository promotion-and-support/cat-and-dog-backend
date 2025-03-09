import Joi from 'joi';
import { Message } from 'grammy/types';
import { THandler } from '../../controller/types';

const ALLOWED_FOR = ['OWNER', 'ADMIN'];

export const message: THandler<
  { chatId: string; message: Record<string, string> },
  boolean
> = async ({ isAdmin }, { chatId, message }) => {
  if (!isAdmin) {
    return false;
  }

  const [role] = await execQuery.role.getByChatId([chatId]);
  const allowed = ALLOWED_FOR.includes(role?.name || '');

  if (!allowed) {
    return false;
  }

  return new domain.events.Events().setMessage(message as unknown as Message);
};
message.responseSchema = Joi.boolean();
