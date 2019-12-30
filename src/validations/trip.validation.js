import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';
import LocationService from '../services/location.service';

const Joi = joiBase.extend(joiDate);

/**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {returns} this is the function for validation
*/
async function tripValidation(req, res, next) {
  const {
    departureDate,
    returnDate,
  } = req.body;
  const schema = Joi.object({
    originId: Joi.number()
      .required(),
    destinationId: Joi.number()
      .required(),
    departureDate: Joi.date().greater('now').utc().format('YYYY-MM-DD')
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
    accommodationId: Joi.number()
  });

  const { error } = schema.validate(req.body);
  const errorMessages = [];
  if (error) {
    error.details.forEach((err) => {
      errorMessages.push(err.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    });
  }
  const locations = [req.body.originId, req.body.destinationId];
  await Promise.all(locations.map(async loc => {
    const isLocationExist = await LocationService.findLocationByProperty({ id: loc });
    if (!isLocationExist) {
      errorMessages.push(`location with id ${loc} is not available`);
    }
  }));
  if (departureDate > returnDate) {
    ResponseService.setError(400, 'Travel date can not be greater than return date');
    return ResponseService.send(res);
  }
  if (errorMessages.length !== 0) {
    ResponseService.setError(400, errorMessages);
    return ResponseService.send(res);
  }

  const tripId = `${req.userData.id}${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${req.body.destinationId}`;
  const existTrip = await TripService.findTripByProperty({ tripId });
  if (existTrip) {
    ResponseService.setError(409, 'Trip request already created');
    return ResponseService.send(res);
  }
  req.tripId = tripId;
  next();
}

export default tripValidation;
