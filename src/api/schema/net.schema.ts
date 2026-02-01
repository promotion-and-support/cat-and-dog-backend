import Joi from 'joi';
import {
  INetCreateParams,
  INetResponse,
  INetsResponse,
  INetUpdateParams,
  INetWaiting,
  IWaitNets,
  OmitNull,
} from '../../client/common/server/types/types';
import { TJoiSchema } from '../../controller/types';
import { JOI_NULL } from './index.schema';
import { NodeSchema } from './node.schema';
import { MemberResponseSchema } from './member.schema';

export const NetCreateParamsSchema = {
  node_id: [Joi.number(), JOI_NULL],
  name: Joi.string().required(),
} as Record<keyof INetCreateParams, TJoiSchema>;

export const NetEnterParamsSchema = { net_id: Joi.number().required() };

export const NetUpdateParamsSchema = {
  node_id: Joi.number(),
  goal: Joi.string(),
} as Record<keyof INetUpdateParams, TJoiSchema>;

export const NetSchema = {
  net_id: Joi.number(),
  net_level: Joi.number(),
  parent_net_id: [Joi.number(), JOI_NULL],
  root_net_id: Joi.number(),
  count_of_nets: Joi.number(),
  blocked: Joi.boolean(),
};

export const NetDataSchema = {
  net_id: Joi.number(),
  name: Joi.string(),
  goal: [Joi.string(), JOI_NULL],
  resource_name: [Joi.string(), JOI_NULL],
  net_link: [Joi.string(), JOI_NULL],
};

export const NetResponseSchema = [
  JOI_NULL,
  {
    ...NetSchema,
    ...NetDataSchema,
    ...NodeSchema,
    total_count_of_members: Joi.number(),
  } as Record<keyof OmitNull<INetResponse>, TJoiSchema>,
];

export const NetsResponseSchema = NetResponseSchema[1] as Record<
  keyof INetsResponse[number],
  TJoiSchema
>;

export const NetViewResponseSchema = { ...MemberResponseSchema };

export const NetConnectByTokenSchema = [
  JOI_NULL,
  {
    net_id: Joi.number().required(),
    error: Joi.string(),
  },
];

export const WaitCreateParamsSchema = {
  token: Joi.string().required(),
  comment: Joi.string().required().max(255),
  test: Joi.boolean().required(),
};

export const WaitNetsSchema = {
  net_id: Joi.number(),
  name: Joi.string(),
} as Record<keyof IWaitNets[number], TJoiSchema>;

export const NetWaitingResponseSchema = {
  user_id: Joi.number(),
  name: Joi.string(),
  comment: Joi.string(),
} as Record<keyof INetWaiting, TJoiSchema>;
