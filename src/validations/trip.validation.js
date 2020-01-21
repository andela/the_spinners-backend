import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import { Op } from 'sequelize';
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
  });
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessages = error.details.map((err) => err.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    ResponseService.setError(400, errorMessages);
    return ResponseService.send(res);
  }
  const locations = [req.body.originId, req.body.destinationId];
  await Promise.all(locations.map(async loc => {
    const isLocationExist = await LocationService.findLocationByProperty({ id: loc });
    if (!isLocationExist) {
      ResponseService.setError(400, `location with id ${loc} is not available`);
      return ResponseService.send(res);
    }
  }));
  const tripExist = await TripService.findTripByProperty({
    originId: req.body.originId,
    destinationId: req.body.destinationId,
    departureDate: { [Op.between]: [new Date(`${req.body.departureDate}T00:00:00.000Z`), new Date(`${req.body.departureDate}T23:59:59.999Z`)] }
  });
  if (tripExist) {
    ResponseService.setError(409, 'Trip request already created');
    return ResponseService.send(res);
  }
  next();
}

export default tripValidation;
