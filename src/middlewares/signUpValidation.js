import Joi from '@hapi/joi';

export default (req, res, next) => {
  const signUpSchema = Joi.object({
    firstName: Joi.string().required().error(new Error('Firstname is required')),
    lastName: Joi.string().required().error(new Error('Lastname is required')),
    email: Joi.string().email({ minDomainSegments: 2 }).required().error(new Error('Email is required')),
    password: Joi.string().required().error(new Error('Password is required'))
  });

  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  }
  next();
};
