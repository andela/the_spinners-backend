import TripService from '../services/trip.service';
import ResponseService from '../services/response.service';
import JwtService from '../services/jwt.service';

/**
 *
 *
 * @class TripController
 */
class TripController {
  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof Trips
   */
  static async requestOneWayTrip(req, res) {
    const newTrip = await TripService.createTrip({
      ...req.body, userId: req.userData.id, tripType: 'one-way', status: 'pending'
    });
    delete newTrip.dataValues.updatedAt;
    delete newTrip.dataValues.createdAt;
    ResponseService.setSuccess(201, 'Trip is successfully created', newTrip.dataValues);
    return ResponseService.send(res);
  }

  /**
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof Trips
   */
  static async requestReturnTrip(req, res) {
    const signInUser = JwtService.verifyToken(req.headers.authorization);
    const {
      departure, destination, travelDate, returnDate, travelReasons, accommodation
    } = req.body;

    const returnTrip = {
      userId: signInUser.id,
      tripType: 'return-trip',
      departure,
      destination,
      travelDate,
      returnDate,
      travelReasons,
      accommodation,
      status: 'pending'
    };
    await TripService.createTrip(returnTrip);
    ResponseService.setSuccess(201, 'Trip created successfully', returnTrip);
    return ResponseService.send(res);
  }

  /**
   * @param {req} req
   * @param {res} res
   * @returns {requestLists} this function returns user request Lists
  */
  static async userTripRequestList(req, res) {
    const { userId } = req.params;
    const trips = await TripService.findAllByProperty({ userId });
    ResponseService.setSuccess(200, 'List of requested trips', trips);
    return ResponseService.send(res);
  }

  /**
   * @param {req} req
   * @param {res} res
   * @returns {comments} this function create comments on trip request
  */
  static async userCommentOnRequestsTrip(req, res) {
    const userId = req.signInUser.id;
    const { tripId, comment } = req.body;

    const createComment = {
      userId,
      tripId,
      commentId: req.commentId,
      comment
    };
    await TripService.createComment(createComment);
    delete createComment.commentId;
    ResponseService.setSuccess(201, 'Your comment was submitted successfully', createComment);
    return ResponseService.send(res);
  }
}

export default TripController;
