import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';

export default async (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    lineManagerId: Joi.number().required()
  }).options({ abortEarly: false });

  const { error } = schema.validate(req.params);
  if (error) {
    const { details } = error;
    const errors = details.map(({ message }) => message.replace(/[^a-zA-Z0-9 .-]/g, ''));
    ResponseService.setError(400, errors);
    return ResponseService.send(res);
  }
  const requester = await UserService.findUserByProperty({ id: req.params.userId });
  const manager = await UserService.findUserByProperty({ id: req.params.lineManagerId });
  if (!requester || !manager) {
    ResponseService.setError(404, 'This user does not exist');
    return ResponseService.send(res);
  }
  if (manager.get().role !== 'manager') {
    ResponseService.setError(400, 'This user is not a manager');
    return ResponseService.send(res);
  }
  next();
};
