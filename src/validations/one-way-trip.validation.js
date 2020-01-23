import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import validate from './trip.validation';

const Joi = joiBase.extend(joiDate);

export default async (req, res, next) => {
  const schema = Joi.object({
    originId: Joi.number()
      .required(),
    destinationId: Joi.number()
      .required(),
    departureDate: Joi.date().greater('now').utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'travel date" must not be in the past',
        'date.format': 'travel date must have format YYYY-MM-DD',
        'any.required': 'travel date is required'
      }),
    travelReasons: Joi.string().min(5).trim().regex(/^[a-zA-Z .]+$/)
      .required()
      .messages({
        'string.base': 'travel reasons must be a string',
        'string.empty': 'Please enter the travel reasons',
        'string.pattern.base': 'travel reasons must contain only letters',
        'any.required': 'travel reasons is required'
      }),
    accommodationId: Joi.number()
  }).options({ abortEarly: false });
  validate(req, res, schema, next);
};
