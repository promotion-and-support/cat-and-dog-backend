import Joi from 'joi';

export const UpdateSubscriptionSchema = {
  type: Joi.string().required(),
  subject: Joi.string().required(),
};

export const GetSubscriptionSchema = {
  type: Joi.string().required(),
  subject: Joi.string().required(),
};
