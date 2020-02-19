import TripService from '../services/trip.service';
import ResponseService from '../services/response.service';
import RequestService from '../services/request.service';
import UserService from '../services/user.service';
import { paginationHelper } from '../helpers';

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
    const { lineManagerId } = await UserService.findUserByProperty(req.userData.id);
    const newRequest = await RequestService.createRequest({ requesterId: req.userData.id, status: 'pending', lineManagerId });

    const newTrip = await TripService.createTrip({
      ...req.body, requestId: newRequest.get().id, userId: req.userData.id, tripType: 'one-way', status: 'pending'
    });
    ResponseService.setSuccess(201, 'Trip is successfully created', { newTrip, newRequest });
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
    const { lineManagerId } = await UserService.findUserByProperty(req.userData.id);
    const newRequest = await RequestService.createRequest({ requesterId: req.userData.id, status: 'pending', lineManagerId });

    const returnTrip = await TripService.createTrip({
      ...req.body, requestId: newRequest.get().id, userId: req.userData.id, tripType: 'return-trip', status: 'pending'
    });
    ResponseService.setSuccess(201, 'Trip created successfully', { newTrip: returnTrip, newRequest });
    return ResponseService.send(res);
  }

  /**
   * @param {req} req
   * @param {res} res
   * @returns {requestLists} this function returns user request Lists
  */
  static async userTripRequestList(req, res) {
    const userId = req.userData.id;
    const { page, limit } = req.query;
    const offset = (page - 1) * limit;

    const results = await TripService.findByPropertyAndCountAll({ userId }, { offset, limit });
    ResponseService.setSuccess(200, 'List of requested trips', {
      pageMeta: paginationHelper({
        count: results.count, rows: results.rows, offset, limit
      }),
      rows: results.rows
    });
    return ResponseService.send(res);
  }

  /**
  * @static
  * @param {req} req
  * @param {res} res
  * @returns {response} @memberof Trips
  */
  static async requestMultiCityTrip(req, res) {
    const { lineManagerId } = await UserService.findUserByProperty(req.userData.id);
    const newRequest = await RequestService.createRequest({ requesterId: req.userData.id, status: 'pending', lineManagerId });

    const newMultiCityTrip = req.body.map((trip) => ({ ...trip, userId: req.userData.id, requestId: newRequest.get().id, tripType: 'multi-city' }));
    const newTrips = await TripService.createMultiCityTrip(newMultiCityTrip);
    const newTripArray = newTrips.map((trip) => {
      const { dataValues } = trip;
      const { updatedAt, createdAt, ...newTrip } = dataValues;
      return newTrip;
    });
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
