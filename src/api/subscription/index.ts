import Joi from 'joi';
import { THandler } from '../../controller/types';
import {
  IGetSubscription,
  IUpdateSubscription,
} from '../../client/common/server/types/subscription.types';
import {
  GetSubscriptionSchema,
  UpdateSubscriptionSchema,
} from '../schema/subscription.schema';

/* read */
export const get: THandler<never, IGetSubscription> = async ({ session }) => {
  const user_id = session.read('user_id')!;
  const [subscription] = await execQuery.subscription.get([user_id]);
  return (subscription as IGetSubscription) || null;
};
get.responseSchema = GetSubscriptionSchema;

/* create / update */
export const update: THandler<IUpdateSubscription, boolean> = async (
  { session },
  { type },
) => {
  const user_id = session.read('user_id')!;
  await execQuery.subscription.update([user_id, type]);
  return true;
};
update.paramsSchema = UpdateSubscriptionSchema;
update.responseSchema = Joi.boolean();

/* delete */
export const remove: THandler<never, boolean> = async ({ session }) => {
  const user_id = session.read('user_id')!;
  await execQuery.subscription.remove([user_id]);
  return true;
};
remove.responseSchema = Joi.boolean();
