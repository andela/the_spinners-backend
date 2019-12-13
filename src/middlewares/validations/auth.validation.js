import Joi from '@hapi/joi';

export const signupSchema = {
  signup: Joi.object().keys({
    firstName: Joi.string().regex(/^[a-zA-Z]+$/).required(),
    lastName: Joi.string().regex(/^[a-zA-Z]+$/).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required()
  })
};

export default {
  signupSchema
};
