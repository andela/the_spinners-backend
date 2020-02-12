import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';
import JwtService from '../services/jwt.service';
import UserService from '../services/user.service';
import TripService from '../services/trip.service';

/**
 * class for validations
 */
class UserValidation {
  /**
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {validation} this function validate inputs
 */
  static validateFields(req, res, next) {
    const schema = Joi.object({
      newPassword: Joi.string().min(8).required().messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Please input password',
        'string.min': 'Password should be at least 8 characters long',
        'any.required': 'New password is required'
      }),
      confirmPass: Joi.valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Password does not match',
        'any.required': 'Confirm your password'
      })
    });

    const { error } = schema.validate(req.body);
    const auth = JwtService.verifyToken(req.token);

    if (auth.name) {
      ResponseService.setError(403, 'Access denied, check your email and try again');
      return ResponseService.send(res);
    }

    if (error) {
      ResponseService.setError(400, error.details[0].message);
      return ResponseService.send(res);
    }
    req.userData = auth;
    next();
  }

  /**
  * @param {req} req
  * @param {res} res
  * @param {next} next
  * @returns {validation} this function checks user in find user route
  */
  static async findUserValidation(req, res, next) {
    const { email } = req.body;
    const user = await UserService.findUserByProperty({ email });

    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2 })
        .required()
        .trim()
        .messages({
          'string.empty': 'Please enter email',
          'string.email': 'Enter valid email i.e: email@example.com',
          'any.required': 'Email is required'
        }),
    });

    const { error } = schema.validate({ email });

    if (error) {
      ResponseService.setError(400, error.details[0].message);
      return ResponseService.send(res);
    }

    if (!user) {
      ResponseService.setError(404, `Email ${email} does not exists`);
      return ResponseService.send(res);
    }
    next();
  }

  /**
   * @param {req} req
   * @param {res} res
   * @param {next} next
   * @returns {validation} this function validate user comment on request trip
   *
  */
  static async validateUserComment(req, res, next) {
    const id = req.params.tripId;

    const schema = Joi.object({
      tripId: Joi.number().integer().max(99999999999).greater(0)
        .required()
        .messages({
          'number.greater': 'Trip ID must be greater than 0',
          'any.required': 'Trip ID is required',
          'number.base': 'Trip ID must be a number',
          'number.unsafe': 'Trip ID must be a safe number',
          'number.max': 'Trip ID must be less than or equal to 11'
        }),
      comment: Joi.string().max(250).required().messages({
        'string.empty': 'Comment is not allowed to be empty',
        'string.max': 'Comment length must be less than or equal to 250 characters long',
        'any.required': 'Comment is required'
      })
    }).options({ abortEarly: false });

    const { error } = schema.validate({ ...req.body, ...req.params });

    if (error) {
      const errMessages = [];

      error.details.forEach((err) => {
        errMessages.push(err.message);
      });
      ResponseService.setError(400, errMessages);
      return ResponseService.send(res);
    }

    const findTrip = await TripService.findTripByProperty({ id });
    const signInUser = JwtService.verifyToken(req.headers.authorization);
    // user from the signed in ID to give you all user information
    const user = await UserService.findUserByProperty({ id: signInUser.id });

    if (!findTrip) {
      ResponseService.setError(404, `Trip with ID ${id} doesn't exists`);
      return ResponseService.send(res);
    }
    // line manager for a user who created a trip
    const lineManger = await UserService.findUserByProperty({ id: findTrip.userId });

    if ((user.role === 'requester' && signInUser.id !== findTrip.userId) || (user.role === 'manager' && lineManger.lineManagerId !== signInUser.id)) {
      ResponseService.setError(401, 'You are not authorized to perform this activity');
      return ResponseService.send(res);
    }
    req.signInUser = signInUser;
    next();
  }

  /**
   *
   *
   * @static
   * @param {req} req
   * @param {req} res
   * @param {next} next
   * @memberof UserValidation
   * @returns {validation} this function validate delete comment route
   */
  static async validateDeleteTripComment(req, res, next) {
    const schema = Joi.object({
      tripId: Joi.number().integer().required()
        .messages({
          'number.base': 'Trip ID must be a number',
          'number.unsafe': 'Trip ID must be a safe number',
          'any.required': 'Trip ID is required'
        }),
      commentId: Joi.number().integer().required()
        .messages({
          'number.base': 'Comment ID must be a number',
          'number.unsafe': 'Comment ID must be a safe number',
          'any.required': 'Comment ID is required'
        }),
      subjectType: Joi.string().valid('Trip', 'Accomodation').required()
        .messages({
          'any.only': 'Subject Type must be one of [Trip, Accomodation]',
          'string.empty': 'Subject Type is not allowed to be empty',
          'any.required': 'Subject Type is required'
        })
    }).options({ abortEarly: false });

    const { error } = schema.validate({ ...req.params, ...req.body });
    if (error) {
      const errMessages = error.details.map((err) => (err.message));
      ResponseService.setError(400, errMessages);
      return ResponseService.send(res);
    }
    next();
  }
}

export default UserValidation;
