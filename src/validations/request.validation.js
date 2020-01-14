import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';
import RequestService from '../services/request.service';

/**
 * @param {req} req
 * @param {req} res
 * @param {next} next
 * @returns {validation} this function validate request route
*/
export async function requestValidation(req, res, next) {
  const page = parseInt(req.query.page, 10);
  const limit = parseInt(req.query.limit, 10);

  const schema = Joi.object({
    page: Joi.number().greater(0).required()
      .messages({
        'number.greater': 'Page must be greater than 0',
        'object.unknown': `${page} is not allowed`,
        'any.required': 'Page is required',
        'number.base': 'Page must be a number'
      }),
    limit: Joi.number().greater(0).required()
      .messages({
        'number.greater': 'Limit must be greater than 0',
        'object.unknown': `${limit} is not allowed`,
        'any.required': 'Limit is required',
        'number.base': 'Limit must be a number'
      })
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.query);
  if (error) {
    const { details } = error;
    const errors = details.map(({ message }) => message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    ResponseService.setError(400, errors);
    return ResponseService.send(res);
  }

  const trip = await TripService.findTripByProperty({
    userId: req.userData.id
  });

  if (!trip) {
    ResponseService.setError(404, 'You didn\'t create a trip, please create one');
    return ResponseService.send(res);
  }
  next();
}

export const validateChangingRequestStatus = async (req, res, next) => {
  const schema = Joi.object({
    requestId: Joi.number().required(),
    status: Joi.string().valid('approved', 'rejected').trim()
      .messages({
        'any.only': 'status" must be one of approved or rejected'
      })
      .required()
  }).options({ abortEarly: false });

  const results = schema.validate({ ...req.params, ...req.body });
  if (results.error) {
    const errorMessages = results.error.details.map((error) => error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    ResponseService.setError(400, errorMessages);
    return ResponseService.send(res);
  }
  const isRequestExist = await RequestService.findRequestByProperty({ id: req.params.requestId });
  if (!isRequestExist) {
    ResponseService.setError(404, 'This request does not exist');
    return ResponseService.send(res);
  }
  if (isRequestExist.dataValues.lineManagerId !== req.userData.id) {
    ResponseService.setError(403, 'Forbidden. you are not line manager of this request');
    return ResponseService.send(res);
  }
  if (req.body.status === isRequestExist.dataValues.status) {
    ResponseService.setError(422, `This request is already ${req.body.status}`);
    return ResponseService.send(res);
  }
  next();
};
