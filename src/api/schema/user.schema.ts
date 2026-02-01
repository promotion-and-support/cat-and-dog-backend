import Joi from 'joi';
import { IUserNetDataResponse } from '../../client/common/server/types/types';
import { TJoiSchema } from '../../controller/types';
import { JOI_NULL } from './index.schema';

export const UserNetDataResponseSchema = {
  node_id: Joi.number(),
  parent_node_id: [Joi.number(), JOI_NULL],
  confirmed: [Joi.boolean(), JOI_NULL],
  count_of_members: Joi.number(),
  vote: [Joi.boolean(), JOI_NULL],
  vote_count: Joi.number(),
} as Record<keyof IUserNetDataResponse, TJoiSchema>;

export const UserNodeSchema = { node_id: Joi.number().required() };
