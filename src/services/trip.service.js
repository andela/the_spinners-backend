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
 *
 * @static
 * @param {object} property
 * @memberof TripService
 * @returns {object} this function finds trip
 */
  static findTripByProperty(property) {
    return Trip.findOne({
      where: { ...property }
    });
  }

  /**
   * A method to querry with condition
   * and count all records
   * @static
   * @param {object} property - The condion as an object
   * @param {number} offset - The offset to be used
   * @param {number} limit - The limit to be used
   * @returns {number} The data retrieved
   * @memberof TripService
   */
  static findByPropertyAndCountAll(property, { offset, limit }) {
    return Trip.findAndCountAll({
      where: {
        ...property
      },
      attributes: [
        'userId',
        'tripType',
        'originId',
        'destinationId',
        'departureDate',
        'returnDate', 'travelReasons',
        'accommodationId',
        'createdAt',
        'updatedAt'
      ],
      offset,
      limit
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

  /**
       *
       *
       * @static
       * @param {newTrip} newTrip
       * @returns {newTrip} @memberof TripService
       */
  static createMultiCityTrip(newTrip) {
    return Trip.bulkCreate(newTrip);
  }

  /**
 *
 *
 * @static
 * @param {item} trip user column to be updated
 * @param {value} tripInfo to be updated
 * @returns {updated} @memberof TripService
 */
  static updateTrip(trip, tripInfo) {
    return Trip.update(tripInfo, {
      where: trip,
      returning: true
    });
  }
}


export default TripService;
