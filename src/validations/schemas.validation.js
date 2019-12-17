import Joi from '@hapi/joi';

export const signupSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.base': 'Invalid type, firstname must be a string',
      'string.empty': 'Please enter your firstname',
      'string.pattern.base': 'Firstname must contain only letters',
      'any.required': 'Firstname is required'
    }),
  lastName: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      'string.base': 'Invalid type, lastname must be a string',
      'string.empty': 'Please enter your lastname',
      'string.pattern.base': 'Lastname must contain only letters',
      'any.required': 'Lastname is required'
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .trim()
    .messages({
      'string.base': 'Invalid type, email must be a string',
      'string.empty': 'Please enter email',
      'string.pattern.base': 'Enter valid email i.e: gustave@gmail.com',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .trim()
    .min(8)
    .required()
    .messages({
      'string.base': 'Invalid type, password must be a string',
      'string.empty': 'Please enter password',
      'string.min': 'Password must be atleast 8 characters long',
      'any.required': 'Password is required'
    })
}).options({ abortEarly: false });

export default {
  signupSchema
};
