import Joi from 'joi';
import { JOI_NULL } from './index.schema';

export const NodeSchema = {
  node_id: Joi.number(),
  node_level: Joi.number(),
  parent_node_id: [Joi.number(), JOI_NULL],
  net_id: Joi.number(),
  node_position: Joi.number(),
  count_of_members: Joi.number(),
  updated: Joi.date(),
};
