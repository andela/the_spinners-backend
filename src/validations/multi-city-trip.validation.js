import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import ResponseService from '../services/response.service';
import RequestService from '../services/trip.service';
import LocationService from '../services/location.service';

const Joi = joiBase.extend(joiDate);

export default async (req, res, next) => {
  if (req.body.length < 2) {
    ResponseService.setError(400, 'Multi city have to be more than one destination, otherwise choose either one way or return trip');
    return ResponseService.send(res);
  }
  const allErrorMessages = [];
  await Promise.all(req.body.map(async trip => {
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
    const results = schema.validate({ ...trip });
    const errorMessages = [];
    if (results.error) {
      results.error.details.forEach((error) => {
        errorMessages.push(error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
      });
      allErrorMessages.push(errorMessages);
    }
    if (errorMessages.length === 0) {
      const locations = [trip.originId, trip.destinationId];
      await Promise.all(locations.map(async loc => {
        const isLocationExist = await LocationService.findLocationByProperty({ id: loc });
        if (!isLocationExist) {
          errorMessages.push(`location with id ${loc} is not available`);
        }
      }));
      if (errorMessages.length !== 0) {
        allErrorMessages.push(errorMessages);
      }
    }
  }));
  if (allErrorMessages.length !== 0) {
    ResponseService.setError(400, allErrorMessages);
    return ResponseService.send(res);
  }
  let tripId = `${req.userData.id}${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}`;
  req.body.forEach(trip => {
    tripId += `${trip.destinationId}`;
  });
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < req.body.length; i++) {
    if (i === 0) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (req.body[i].originId !== req.body[i - 1].destinationId) {
      ResponseService.setError(400, 'Next origin location have to be the same as previous destination location');
      return ResponseService.send(res);
    }
  }
  const tripExist = await RequestService.findTripByProperty({ tripId });
  if (tripExist) {
    ResponseService.setError(409, 'Trip request already created');
    return ResponseService.send(res);
  }
  req.tripId = tripId;
  next();
};
