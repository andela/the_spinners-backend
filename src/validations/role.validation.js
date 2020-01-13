import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';

const userRoleSchema = Joi.object({
  userEmail: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .trim()
    .messages({
      'string.empty': 'Please enter userEmail',
      'string.email': 'Enter valid email i.e: email@example.com',
      'any.required': 'userEmail is required'
    }),
  userRole: Joi.string()
    .trim()
    .valid('travel_admin', 'travel_team_member', 'manager', 'requester')
    .required()
    .messages({
      'string.base': 'Invalid type, userRole must be a string',
      'string.empty': 'Please enter userRole',
      'any.required': 'userRole is required'
    })
}).options({ abortEarly: false });

const validateHandler = (schema, body, res, next) => {
  const { error } = schema.validate(body);
  if (error) {
    const { details } = error;
    const errors = details.map(({ message }) => (message.replace(/[^a-zA-Z0-9 .-]/g, '')));
    ResponseService.setError(400, errors);
    return ResponseService.send(res);
  }
  next();
};

export const validateUserRole = (req, res, next) => {
  validateHandler(userRoleSchema, req.body, res, next);
};

export default {
  validateUserRole
};
