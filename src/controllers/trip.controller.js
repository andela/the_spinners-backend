import TripService from '../services/trip.service';
import ResponseService from '../services/response.service';
import RequestService from '../services/request.service';
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
    const { dataValues } = await TripService.createTrip({
      ...req.body, tripId: req.tripId, userId: req.userData.id, tripType: 'one-way', status: 'pending'
    });
    const { updatedAt, createdAt, ...newTrip } = dataValues;
    await RequestService.createRequest({ requesterId: req.userData.id, tripId: dataValues.tripId, status: 'pending' });
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
    const {
      originId, destinationId, departureDate, returnDate, travelReasons, accommodationId
    } = req.body;

    const returnTrip = {
      tripId: req.tripId,
      userId: req.userData.id,
      tripType: 'return-trip',
      originId,
      destinationId,
      departureDate,
      returnDate,
      travelReasons,
      accommodationId,
      status: 'pending'
    };
    await TripService.createTrip(returnTrip);
    await RequestService.createRequest({ requesterId: req.userData.id, tripId: returnTrip.tripId, status: 'pending' });
    ResponseService.setSuccess(201, 'Trip created successfully', returnTrip);
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
    const newMultiCityTrip = req.body.map((trip) => ({ ...trip, tripId: req.tripId, userId: req.userData.id, tripType: 'multi-city' }));
    const newTrips = await TripService.createMultiCityTrip(newMultiCityTrip);
    const newTripArray = newTrips.map((trip) => {
      const { dataValues } = trip;
      const { updatedAt, createdAt, ...newTrip } = dataValues;
      return newTrip;
    });
    const { dataValues } = await RequestService.createRequest({ requesterId: newMultiCityTrip[0].userId, tripId: req.tripId, status: 'pending' });
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

  /**
 *
 *
 * @static
 * @param {req} req
 * @param {res} res
 * @returns {response} @memberof Trips
 */
  static async editOpenTripRequest(req, res) {
    const { userData } = req;
    const userId = userData.id;
    const { tripId } = req.params;
    const [, [{ dataValues }]] = await TripService.updateTrip(
      { userId, tripId },
      { ...req.body }
    );
    ResponseService.setSuccess(200, 'Trip Updated Successfully', dataValues);
    ResponseService.send(res);
  }
}

export default TripController;
