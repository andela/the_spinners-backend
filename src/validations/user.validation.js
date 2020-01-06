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
      ResponseService.setError(403, 'Please check if the token is correct and try again to access this route');
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
    const id = req.body.tripId;

    const schema = Joi.object({
      tripId: Joi.number().greater(0).required()
        .required()
        .messages({
          'number.greater': 'Trip ID must be greater than 0',
          'any.required': 'Trip ID is required',
          'number.base': 'Trip ID must be a number'
        }),
      comment: Joi.string().max(250).required().messages({
        'string.empty': 'Comment is not allowed to be empty',
        'string.max': 'Comment length must be less than or equal to 250 characters long',
        'any.required': 'Comment is required'
      })
    }).options({ abortEarly: false });

    const { error } = schema.validate(req.body);
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
    const commentId = `${signInUser.id}${req.body.comment}`;
    const findComment = await TripService.findCommentByProperty({ commentId });

    if (!findTrip) {
      ResponseService.setError(404, `Trip with ID ${id} doesn't exists`);
      return ResponseService.send(res);
    }

    if (signInUser.id !== findTrip.userId) {
      ResponseService.setError(401, 'You are not allowed to comment on this trip request');
      return ResponseService.send(res);
    }

    if (findComment) {
      ResponseService.setError(409, 'You can not duplicate comment');
      return ResponseService.send(res);
    }
    req.signInUser = signInUser;
    req.commentId = commentId;
    next();
  }
}

export default UserValidation;
