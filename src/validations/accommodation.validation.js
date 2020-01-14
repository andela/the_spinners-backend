import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import Response from '../services/response.service';
import AccommodationService from '../services/accommodation.service';

const Joi = joiBase.extend(joiDate);

export default async (req, res, next) => {
  const schema = Joi.object({
    accommodationId: Joi.number(),
    from: Joi.date().greater('now').utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'Staying from date must not be in the past',
        'date.format': 'Staying from date must have format YYYY-MM-DD',
        'any.required': 'Staying from date is required'
      }),
    to: Joi.date().greater(Joi.ref('from')).utc().format('YYYY-MM-DD')
      .required()
      .messages({
        'date.greater': 'check-out date must be greater than check-in date',
        'date.format': 'Staying to date must have format YYYY-MM-DD',
        'any.required': 'Staying to date is required'
      })
  }).options({ abortEarly: false });

  const results = schema.validate({ ...req.body, ...req.params });
  if (results.error) {
    const errorMessages = results.error.details.map((error) => error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    Response.setError(400, errorMessages);
    return Response.send(res);
  }
  const isAccommodationExist = await AccommodationService.findAccommodationByProperty({
    id: req.params.accommodationId
  });
  if (!isAccommodationExist) {
    Response.setError(404, 'this accommodation id does not exist');
    return Response.send(res);
  }
  if (!isAccommodationExist.isAvailable) {
    Response.setError(422, 'this accommodation is not available');
    return Response.send(res);
  }
  next();
};
