import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';
import JwtService from '../services/jwt.service';
import transformErrorHandler from '../helpers/transformErrorHandler';

const signupSchema = Joi.object({
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
      'string.empty': 'Please enter email',
      'string.email': 'Enter valid email i.e: email@example.com',
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

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .trim()
    .messages({
      'string.empty': 'Please enter email',
      'string.email': 'Enter valid email i.e: email@example.com',
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

const resendAcccActivationLinkSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .trim()
    .messages({
      'string.empty': 'Please enter email',
      'string.email': 'Enter valid email i.e: email@example.com',
      'any.required': 'Email is required'
    }),
}).options({ abortEarly: false });

export const validateToken = (req, res, next) => {
  const auth = JwtService.verifyToken(req.token);
  if (auth.name) {
    ResponseService.setError(403, 'Wrong Token Provided');
    return ResponseService.send(res);
  }
  next();
};

export const validateSignup = (req, res, next) => {
  transformErrorHandler(signupSchema, req.body, res, next);
};
export const validateLogin = (req, res, next) => {
  transformErrorHandler(loginSchema, req.body, res, next);
};
export const validateResendVerificationLink = (req, res, next) => {
  transformErrorHandler(resendAcccActivationLinkSchema, req.body, res, next);
};

export default {
  validateSignup,
  validateLogin,
  validateResendVerificationLink,
  validateToken
};
