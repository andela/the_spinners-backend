import models from '../models';

const { Trip } = models;

/**
 *
 *
 * @class TripService
 */
class TripService {
  /**
       *
       *
       * @static
       * @param {newTrip} newTrip
       * @returns {newTrip} @memberof TripService
       */
  static createTrip(newTrip) {
    return Trip.create(newTrip);
  }

  /**
 * find trip
 * @static
 * @param {object} property
 * @memberof TripService
 * @returns {object} data
 */
  static findTripByProperty(property) {
    return Trip.findOne({
      where: { ...property }
    });
  }
}


export default TripService;
