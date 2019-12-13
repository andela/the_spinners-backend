import Joi from '@hapi/joi';

export default (req, res, next) => {
  const signupValidation = Joi.object({
    firstName: (Joi.string().regex(/^[a-zA-Z]+$/).required()).error(new Error('Firstname is required, And must be letters only')),
    lastName: (Joi.string().regex(/^[a-zA-Z]+$/).required()).error(new Error('Lastname is required, And must be letters only')),
    email: Joi.string().email({ minDomainSegments: 2 }).required().error(new Error('Email should be valid e.g(example@site.ext)')),
    password: (Joi.string().regex(/^[a-zA-Z0-9]{8,}$/).required()).error(new Error('Password is required, Minimum lenght 8 characters'))
  });

  const { error } = signupValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  }
  next();
};
