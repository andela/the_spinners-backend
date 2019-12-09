import TripService from '../services/trip.service';
import Response from '../services/response.service';


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
    Response.setSuccess(201, 'Trip is successfully created', newTrip.dataValues);
    return Response.send(res);
  }
}

export default TripController;
