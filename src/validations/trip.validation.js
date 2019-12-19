import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';

const Joi = joiBase.extend(joiDate);

/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {returns} this is the function for validation
*/
async function tripValidation(req, res, next) {
  const {
    travelDate,
    returnDate,
    destination
  } = req.body;
  const schema = Joi.object({
    departure: Joi.string().min(2).trim().regex(/^[a-zA-Z .]+$/)
      .required()
      .messages({
        'any.required': 'Departure is required',
        'string.empty': 'Departure is not allowed to be empty',
        'string.min': 'Departure must be at least 2 characters long',
        'string.pattern.base': 'Invalid, numbers are not allowed in departure field'
      }),
    destination: Joi.string().min(2).trim().regex(/^[a-zA-Z .]+$/)
      .required()
      .messages({
        'any.required': 'Destination is required',
        'string.empty': 'Destination is not allowed to be empty',
        'string.min': 'Destination must be at least 2 characters long',
        'string.pattern.base': 'Invalid, numbers are not allowed in destination field'
      }),
    travelDate: Joi.date().greater('now').utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'Date should be greater than today\'s date',
        'date.format': 'Date must be in YYYY-MM-DD format',
        'any.required': 'Travel date is required'
      }),
    returnDate: Joi.date().greater('now').utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'Date should be greater than today\'s date',
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
    accommodation: Joi.string().allow('').allow(null).regex(/^[a-zA-Z .]+$/)
      .required()
      .messages({
        'any.required': 'Accommodation is required',
        'string.pattern.base': 'Invalid, numbers are not allowed in accommodation field'
      })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    ResponseService.setError(400, error.details[0].message);
    return ResponseService.send(res);
  }
  if (travelDate > returnDate) {
    ResponseService.setError(400, 'Travel date can not be greater than return date');
    return ResponseService.send(res);
  }

  const existTrip = await TripService.findTripByProperty({
    destination,
    travelDate: new Date(travelDate)
  });

  if (existTrip) {
    ResponseService.setError(409, 'A trip can not have same destination or same travel date');
    return ResponseService.send(res);
  }
  next();
}

export default tripValidation;
