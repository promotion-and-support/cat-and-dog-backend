import Joi from 'joi';
import { JOI_NULL } from '../../controller/constants';

export const UpdateSubscriptionSchema = {
  type: Joi.string().required(),
};

export const GetSubscriptionSchema = [
  {
    type: Joi.string().required(),
  },
  JOI_NULL,
];
