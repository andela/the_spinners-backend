// eslint-disable-next-line import/no-unresolved
import Joi from 'joi';

export default (req, res, next) => {
  const signUpSchema = {
    firstName: (Joi.string().required()).replace(/\s/g, '').error(() => ({
      message: 'Firstname is required'
    })),
    lastName: (Joi.string().required()).replace(/\s/g, '').error(() => ({
      message: 'Lastname is required'
    })),
    username: (Joi.string().required()).replace(/\s/g, '').error(() => ({
      message: 'Username is required'
    })),
    email: (Joi.string().email({ minDomainSegments: 2 }).required()).replace(/\s/g, '')
      .error(() => ({
        message: 'Email is required'
      })),
    password: (Joi.string().required()).replace(/\s/g, '').error(() => ({
      message: 'Password is required'
    })),
  };

  const validationResult = Joi.validate(req.body, signUpSchema);

  if (validationResult.error) {
    return res.status(400).json({
      status: 400,
      error: `${validationResult.error.details[0].message}`
    });
  }
  next();
};
