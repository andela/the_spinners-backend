import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import ResponseService from '../services/response.service';

const Joi = joiBase.extend(joiDate);

const accountProfileSchema = Joi.object({
  gender: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .valid('M', 'F')
    .messages({
      'string.base': 'Invalid type, gender must be a string',
      'string.empty': 'Please enter your gender',
      'string.pattern.base': 'Gender must contain only letters'
    }),
  birthDate: Joi.date().less('2002-01-01').utc().format('YYYY-MM-DD')
    .messages({
      'date.less': 'Birth date must not be in the past and Not less than 2002-01-01',
      'date.format': 'Birth date must have format YYYY-MM-DD'
    }),
  preferredLanguage: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .valid('english', 'french')
    .messages({
      'string.base': 'Invalid type, Language must be a string',
      'string.empty': 'Please enter your preferred language',
      'string.pattern.base': 'Language must contain only letters'
    }),
  preferredCurrency: Joi.string()
    .trim()
    .regex(/^[a-zA-Z]+$/)
    .valid('Dollar', 'Euro', 'Pound')
    .messages({
      'string.base': 'Invalid type, Currency must be a string',
      'string.empty': 'Please enter your preferred currency',
      'string.pattern.base': 'Currency must contain only letters'
    }),
  residence: Joi.string()
    .trim()
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
    .messages({
      'string.base': 'Invalid type, Residence must be a string',
      'string.empty': 'Please enter your residence',
      'string.pattern.base': 'Residence must contain only letters'
    }),
  department: Joi.string()
    .trim()
    .regex(/^[a-zA-Z][a-zA-Z\s]*$/)
    .messages({
      'string.base': 'Invalid type, department must be a string',
      'string.empty': 'Please enter your preferred department',
      'string.pattern.base': 'Department must contain only letters',
    }),
  profilePicture: Joi.string()
    .trim()
    .messages({
      'string.base': 'Invalid type, profilePicture must be a string',
      'string.empty': 'Please enter your preferred profilePicture'
    })
}).options({ abortEarly: false });

const validateHandler = (schema, body, res, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const errors = [];
    const { details } = error;
    details.forEach(({ message }) => {
      errors.push(message.split('"').join(' '));
    });
    ResponseService.setError(400, errors);
    return ResponseService.send(res);
  }
  next();
};

export const validateAccountProfile = (req, res, next) => {
  validateHandler(accountProfileSchema, req.body, res, next);
};

export default {
  validateAccountProfile
};
