import ResponseService from '../services/response.service';
import TripService from '../services/trip.service';

/**
 *
 *
 * @class CommentMiddleware
 */
class TripMiddleware {
  /**
 *
 *
 * @static
 * @param {req} req
 * @param {res} res
 * @param {next} next
 * @returns {object} This function check if origin and destination are equal
 * @memberof TripMiddleware
 */
  static async checkOriginDestinationEquality(req, res, next) {
    const { originId, destinationId } = req.body;
    if (originId === destinationId) {
      ResponseService.setError(400, 'Origin and destination must be different');
      return ResponseService.send(res);
    }
    next();
  }
}

export default TripMiddleware;
