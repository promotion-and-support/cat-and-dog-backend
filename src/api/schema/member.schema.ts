import Joi from 'joi';
import {
  IMemberConfirmParams,
  IMemberInviteParams,
  IMemberResponse,
} from '../../client/common/server/types/types';
import { TJoiSchema } from '../../controller/types';
import { JOI_NULL } from './index.schema';

export const MemberConfirmParamsSchema = {
  node_id: Joi.number().required(),
  member_id: Joi.number().required(),
} as Record<keyof IMemberConfirmParams, TJoiSchema>;

export const MemberInviteParamsSchema = {
  ...MemberConfirmParamsSchema,
  member_name: Joi.string().required(),
} as Record<keyof IMemberInviteParams, TJoiSchema>;

export const MemberResponseSchema = {
  node_id: Joi.number(),
  count_of_members: Joi.number(),
  user_id: [Joi.number(), JOI_NULL],
  name: [Joi.string(), JOI_NULL],
  confirmed: [Joi.boolean(), JOI_NULL],
  token: [Joi.string(), JOI_NULL],
  member_name: [Joi.string(), JOI_NULL],
  dislike: [Joi.boolean(), JOI_NULL],
  vote: [Joi.boolean(), JOI_NULL],
  vote_count: Joi.number(),
} as Record<keyof IMemberResponse, TJoiSchema>;
