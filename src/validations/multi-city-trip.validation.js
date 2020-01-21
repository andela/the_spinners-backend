import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import { Op } from 'sequelize';
import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';
import LocationService from '../services/location.service';

const Joi = joiBase.extend(joiDate);

export default async (req, res, next) => {
  const schema = Joi.array()
    .items(Joi.object({
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
    }).options({ abortEarly: false })).min(2).required()
    .messages({
      'array.min': 'Multi city have to be more than one destination, otherwise choose either one way or return trip',
      'array.base': 'Request body must be an array'
    });
  const results = schema.validate(req.body);
  const errorMessages = [];
  const allErrorMessages = [];
  if (results.error) {
    results.error.details.forEach((error) => {
      errorMessages.push(error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    });
    allErrorMessages.push(errorMessages);
  }
  if (errorMessages.length === 0) {
    req.body.map(async trip => {
      const locations = [trip.originId, trip.destinationId];
      await Promise.all(locations.map(async loc => {
        const isLocationExist = await LocationService.findLocationByProperty({ id: loc });
        if (!isLocationExist) {
          allErrorMessages.push(`location with id ${loc} is not available`);
        }
      }));
    });
  }
  if (allErrorMessages.length !== 0) {
    ResponseService.setError(400, allErrorMessages);
    return ResponseService.send(res);
  }
  const filteredTrips = req.body.filter((trip, index) => index !== 0);
  filteredTrips.forEach((trip, index) => {
    if (req.body[index + 1].originId !== req.body[index].destinationId) {
      ResponseService.setError(400, 'Next origin location have to be the same as previous destination location');
      return ResponseService.send(res);
    }
  });
  const trips = await Promise.all(req.body.map(async (trip) => {
    const tripExist = await TripService.findTripByProperty({
      originId: trip.originId,
      destinationId: trip.destinationId,
      departureDate: { [Op.between]: [new Date(`${trip.departureDate}T00:00:00.000Z`), new Date(`${trip.departureDate}T23:59:59.999Z`)] }
    });
    return tripExist;
  }));
  if (trips[0] !== null) {
    ResponseService.setError(409, 'Trip request already created');
    return ResponseService.send(res);
  }
  next();
};
