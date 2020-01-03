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
      attributes: ['userId', 'tripType', 'departure', 'destination', 'travelDate', 'returnDate', 'travelReasons', 'accommodation', 'status']
    });
  }
}


export default TripService;
