import Joi from 'joi';
import { IUserNode } from '../../client/common/server/types/types';
import { THandler } from '../../controller/types';
import { UserNodeSchema } from '../schema/schema';

const leave: THandler<IUserNode> = async ({ member: m }) => {
  const member = m!.get();
  const { confirmed } = member;
  const event_type = confirmed ? 'LEAVE' : 'LEAVE_CONNECTED';
  const remove = domain.net.NetArrange.removeMemberFromNet;
  await remove(event_type, member);
  return true;
};
leave.paramsSchema = UserNodeSchema;
leave.responseSchema = Joi.boolean();
leave.allowedForNetUser = 'INVITING';
leave.checkNet = true;

export = leave;
