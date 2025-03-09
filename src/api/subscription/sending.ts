import Joi from 'joi';
import { THandler } from '../../controller/types';

const handler: THandler<never, boolean> = async ({ isAdmin }) => {
  if (!isAdmin) {
    return false;
  }
  new domain.events.Events().sendInPeriod();
  return true;
};
handler.responseSchema = Joi.boolean();

export = handler;
