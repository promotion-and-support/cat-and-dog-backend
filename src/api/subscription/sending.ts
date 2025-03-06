import Joi from 'joi';
import { THandler } from '../../controller/types';

const handler: THandler<never, boolean> = async () => {
  new domain.events.Events().sendInPeriod();
  return true;
};
handler.responseSchema = Joi.boolean();

export = handler;
