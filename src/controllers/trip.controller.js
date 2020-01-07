import TripService from '../services/trip.service';
import ResponseService from '../services/response.service';
import JwtService from '../services/jwt.service';
import RequestService from '../services/request.service';
import UserService from '../services/user.service';

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
    const { dataValues } = await TripService.createTrip({
      ...req.body, tripId: req.tripId, userId: req.userData.id, tripType: 'one-way', status: 'pending'
    });
    const { updatedAt, createdAt, ...newTrip } = dataValues;
    ResponseService.setSuccess(201, 'Trip is successfully created', newTrip);
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
      tripId: req.tripId,
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
  * @static
  * @param {req} req
  * @param {res} res
  * @returns {response} @memberof Trips
  */
  static async requestMultiCityTrip(req, res) {
    const newMultiCityTrip = req.body.map((trip) => ({ ...trip, tripId: req.tripId, userId: req.userData.id, tripType: 'multi-city' }));
    const newTrips = await TripService.createMultiCityTrip(newMultiCityTrip);
    const newTripArray = newTrips.map((trip) => {
      const { dataValues } = trip;
      const { updatedAt, createdAt, ...newTrip } = dataValues;
      return newTrip;
    });
    const { lineManagerId } = await UserService.findUserByProperty(req.userData.id);
    const { dataValues } = await RequestService.createRequest({ requesterId: newMultiCityTrip[0].userId, tripId: req.tripId, status: 'pending', lineManagerId });
    const { updatedAt, createdAt, ...newRequest } = dataValues;
    ResponseService.setSuccess(201, 'Trip request is successfully created', { newTrip: newTripArray, newRequest });
    return ResponseService.send(res);
  }

  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof Trips
   */
  static async viewAvailableLocations(req, res) {
    const locations = await TripService.findAllLocations();
    const availableLocations = locations.map(loc => {
      const { dataValues } = loc;
      const { updatedAt, createdAt, ...location } = dataValues;
      return location;
    });
    ResponseService.setSuccess(200, 'List of all available locations', availableLocations);
    return ResponseService.send(res);
  }
}

export default TripController;
