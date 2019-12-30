import models from '../models';

const { Trip, Location } = models;

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

  /**
 *
 * @static
 * @param {property} property
 * @memberof TripService
 * @returns {object} data
 */
  static findAllByProperty(property) {
    return Trip.findAll({
      where: {
        ...property
      },
      attributes: ['userId', 'tripType', 'originId', 'destinationId', 'departureDate', 'returnDate', 'travelReasons', 'accommodationId']
    });
  }

  /** find locations
  * @static
  * @param {object} property
  * @memberof TripService
  * @returns {object} data
  */
  static findAllLocations() {
    return Location.findAll();
  }
}


export default TripService;
