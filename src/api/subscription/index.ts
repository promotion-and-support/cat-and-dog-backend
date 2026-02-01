import Joi from 'joi';
import { THandler } from '../../controller/types';
import {
  IGetSubscription,
  IUpdateSubscription,
  SubscriptionSubjectKeys,
} from '../../client/common/server/types/subscription.types';
import {
  GetSubscriptionSchema,
  UpdateSubscriptionSchema,
  JOI_NULL,
} from '../schema/schema';

/* read */
export const get: THandler<never, IGetSubscription> = async ({ session }) => {
  const user_id = session.read('user_id')!;
  const subscriptions = await execQuery.subscription.get([user_id]);
  return subscriptions as IGetSubscription;
};
get.responseSchema = GetSubscriptionSchema;

/* create / update */
export const update: THandler<IUpdateSubscription, boolean> = async (
  { session },
  { type, subject },
) => {
  const user_id = session.read('user_id')!;
  await execQuery.subscription.update([user_id, type, subject]);
  return true;
};
update.paramsSchema = UpdateSubscriptionSchema;
update.responseSchema = Joi.boolean();

/* delete */
export const remove: THandler<
  { subject: SubscriptionSubjectKeys | null },
  boolean
> = async ({ session }, { subject }) => {
  const user_id = session.read('user_id')!;
  await execQuery.subscription.remove([user_id, subject]);
  return true;
};
remove.paramsSchema = {
  subject: [Joi.string(), JOI_NULL],
};
remove.responseSchema = Joi.boolean();
