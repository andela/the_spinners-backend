import Response from '../helpers/response';
import { signupSchema } from './validations/auth.validation';

const authValidation = {
  signupValidate: (req, res, next) => {
    const { error } = signupSchema.signup.validate(req.body);
    if (error) {
      const { message } = error;
      Response.setError(400, message.replace(/[^a-zA-Z0-9 .]/g, ''));
      return Response.send(res);
    }
    next();
  }
};


export default authValidation;
