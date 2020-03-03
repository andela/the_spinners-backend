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
   * @returns {object} This function check if trip ID exists
   * @memberof TripMiddleware
   */
  static async checkTripExist(req, res, next) {
    const trip = await TripService
      .findTripByProperty({
        id: req.params.tripId,
        userId: req.userData.id
      });

    if (!trip) {
      ResponseService.setError(404, 'Trip ID does not exists or you does not belong to the trip ID');
      return ResponseService.send(res);
    }
    next();
  }

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
