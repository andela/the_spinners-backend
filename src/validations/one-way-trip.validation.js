import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import Response from '../services/response.service';
import TripService from '../services/trip.service';

const Joi = joiBase.extend(joiDate);

export default async (req, res, next) => {
  const schema = Joi.object({
    departure: Joi.string().min(2).trim().regex(/^[a-zA-Z .]+$/)
      .required()
      .messages({
        'string.base': 'departure must be a string',
        'string.empty': 'Please enter the departure',
        'string.pattern.base': 'departure must contain only letters',
        'any.required': 'departure is required'
      }),
    destination: Joi.string().min(2).trim().regex(/^[a-zA-Z .]+$/)
      .required()
      .messages({
        'string.base': 'destination must be a string',
        'string.empty': 'Please enter the destination',
        'string.pattern.base': 'destination must contain only letters',
        'any.required': 'destination is required'
      }),
    travelDate: Joi.date().greater('now').utc().format('YYYY-MM-DD')
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
    accommodation: Joi.string().allow('').trim().allow(null)
      .regex(/^[a-zA-Z .]+$/)
      .messages({
        'string.base': 'accomodation must be a string',
        'string.empty': 'Please enter the accomodation',
        'string.pattern.base': 'accomodation must contain only letters',
        'any.required': 'accomodation is required'
      }),
  }).options({ abortEarly: false });

  const results = schema.validate({ ...req.body });
  if (results.error) {
    const errorMessages = [];
    results.error.details.forEach((error) => {
      errorMessages.push(error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    });
    Response.setError(400, errorMessages);
    return Response.send(res);
  }
  const tripExist = await TripService.findTripByProperty({
    userId: req.userData.id,
    destination: req.body.destination,
    travelDate: new Date(req.body.travelDate)
  });
  if (tripExist) {
    Response.setError(409, 'Trip already created');
    return Response.send(res);
  }
  next();
};
