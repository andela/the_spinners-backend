import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import { Op } from 'sequelize';
import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';
import LocationService from '../services/location.service';

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

  const results = schema.validate({ ...req.body });
  if (results.error) {
    const errorMessages = results.error.details.map((error) => error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
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
    ResponseService.setError(409, 'This trip request was already created');
    return ResponseService.send(res);
  }
  next();
};
