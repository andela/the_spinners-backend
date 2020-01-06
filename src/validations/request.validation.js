import Joi from '@hapi/joi';
import ResponseService from '../services/response.service';
import JwtService from '../services/jwt.service';
import UserService from '../services/user.service';
import TripService from '../services/trip.service';

/**
 * @param {req} req
 * @param {req} res
 * @param {next} next
 * @returns {validation} this function validate request route
*/
async function requestValidation(req, res, next) {
  const signInUser = JwtService.verifyToken(req.headers.authorization);
  const { userId } = req.params;

  const schema = Joi.object({
    userId: Joi.string().max(11).regex(/^[0-9]{1,11}$/)
      .messages({
        'string.max': 'User ID length must be less than or equal to 11 characters long',
        'string.pattern.base': 'Invalid, ID must contain only numbers'
      })
  });

  const { error } = schema.validate(req.params);
  if (error) {
    ResponseService.setError(400, error.details[0].message);
    return ResponseService.send(res);
  }

  const user = await UserService.findUserByProperty({ id: userId });
  const trip = await TripService.findTripByProperty({
    userId
  });

  if (!user) {
    ResponseService.setError(404, 'User ID does not exists');
    return ResponseService.send(res);
  }

  if (Number(userId) !== signInUser.id) {
    ResponseService.setError(401, 'Unauthorized, the ID does not match the signed in user ID');
    return ResponseService.send(res);
  }

  if (!trip) {
    ResponseService.setError(404, 'You didn\'t create a trip, please create one');
    return ResponseService.send(res);
  }
  next();
}

export default requestValidation;
