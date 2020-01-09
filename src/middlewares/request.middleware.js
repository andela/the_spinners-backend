import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
import RequestService from '../services/request.service';
import ResponseService from '../services/response.service';

const Joi = joiBase.extend(joiDate);

export default async (req, res, next) => {
  const schema = Joi.object({
    requestId: Joi.number().required(),
  }).options({ abortEarly: false });

  const results = schema.validate(req.params);
  if (results.error) {
    const errorMessages = [];
    results.error.details.forEach((error) => {
      errorMessages.push(error.message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    });
    ResponseService.setError(400, errorMessages);
    return ResponseService.send(res);
  }
  const isRequestExist = await RequestService.findTypeByProperty({ id: req.params.requestId });
  if (!isRequestExist) {
    ResponseService.setError(404, 'This request does not exist');
    return ResponseService.send(res);
  }
  if (isRequestExist.dataValues.lineManagerId !== req.userData.id) {
    ResponseService.setError(403, 'Forbidden. you are not line manager of this request');
    return ResponseService.send(res);
  }
  if (req.route.path === '/:requestId/reject' && isRequestExist.dataValues.status === 'rejected') {
    ResponseService.setError(422, 'This request is already rejected');
    return ResponseService.send(res);
  }
  if (req.route.path === '/:requestId/approve' && isRequestExist.dataValues.status === 'approved') {
    ResponseService.setError(422, 'This request is already approved');
    return ResponseService.send(res);
  }
  next();
};
