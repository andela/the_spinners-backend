import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import Response from '../services/response.service';
import AccommodationService from '../services/accommodation.service';

const Joi = joiBase.extend(joiDate);

export default async (req, res, next) => {
  const schema = Joi.object({
    typeId: Joi.number(),
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

  const results = schema.validate({ ...req.body });
  const errorMessages = [];
  if (results.error) {
    results.error.details.forEach((error) => {
      errorMessages.push(error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    });
  }
  if (errorMessages.length !== 0) {
    Response.setError(400, errorMessages);
    return Response.send(res);
  }
  const isTypeExist = await AccommodationService.findTypeByProperty({ id: req.body.typeId });
  if (!isTypeExist) {
    Response.setError(404, 'this accommodation type id does not exist');
    return Response.send(res);
  }
  if (!isTypeExist.isAvailable) {
    Response.setError(422, 'this accommodation type is not available');
    return Response.send(res);
  }
  next();
};
