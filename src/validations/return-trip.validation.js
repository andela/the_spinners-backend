import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import validate from './trip.validation';

const Joi = joiBase.extend(joiDate);

/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {returns} this is the function for validation
*/
async function tripValidation(req, res, next) {
  const schema = Joi.object({
    originId: Joi.number()
      .required(),
    destinationId: Joi.number()
      .required(),
    departureDate: Joi.date().greater('now').utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'departure date should be greater than today\'s date',
        'date.format': 'Date must be in YYYY-MM-DD format',
        'any.required': 'Travel date is required'
      }),
    returnDate: Joi.date().greater(Joi.ref('departureDate')).utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'any.ref': 'return date should be greater than departure date',
        'date.format': 'Date must be in YYYY-MM-DD format',
        'any.required': 'Return date is required'
      }),
    travelReasons: Joi.string().min(5).trim()
      .required()
      .messages({
        'any.required': 'Travel reasons is required',
        'string.empty': 'Travel reasons is not allowed to be empty',
        'string.min': 'Travel reasons must be at least 5 characters long'
      }),
    accommodationId: Joi.number()
  }).options({ abortEarly: false });
  validate(req, res, schema, next);
}

export default tripValidation;
