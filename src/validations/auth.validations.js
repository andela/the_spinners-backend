/* eslint-disable quotes */
import Response from '../helpers/response';
import { signupSchema } from './schemas.validation';

export const signupValidator = (req, res, next) => {
  const userInputValidator = signupSchema.validate(req.body);
  if (userInputValidator.error) {
    const errors = [];
    for (let i = 0; i < userInputValidator.error.details.length; i += 1) {
      errors.push(userInputValidator.error.details[i].message.split('"').join(" "));
    }
    Response.setError(400, errors);
    return Response.send(res);
  }
  next();
};

export default {
  signupValidator
};
