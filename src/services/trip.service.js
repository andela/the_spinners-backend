import models from '../models';

const { Trip, Location, Request } = models;

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
 *
 * @static
 * @param {object} property
 * @memberof TripService
 * @returns {object} @memberof TripService
 */
  static findTripsByProperty(property) {
    return Trip.findAll({
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
        'id',
        'userId',
        'tripType',
        'requestId',
        'originId',
        'destinationId',
        'departureDate',
        'returnDate', 'travelReasons',
        'accommodationId',
        'createdAt',
        'updatedAt'
      ],
      include: [{
        model: Request,
        as: 'request',
      }],
      offset,
      limit
    });
  }

  /** find Trips
  * @static
  * @param {object} property
  * @memberof TripService
  * @returns {object} data
  */
  static findAllByProperty(property) {
    return Trip.findAll({
      where: {
        ...property
      }
    });
  }

  /** find locations
  * @static
  * @param {object} property
  * @memberof TripService
  * @returns {object} data
  */
  static findAllLocations(property) {
    return Location.findAll({
      where: {
        ...property
      }
    });
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
   * @param {item} tripId trip column to be updated
   * @param {value} newTripInfo to be updated
   * @returns {updated} @memberof TripService
   */
  static updateTrip(tripId, newTripInfo) {
    return Trip.update(newTripInfo, {
      where: tripId,
      individualHooks: true,
      returning: true
    });
  }

  /** find locations
  * @static
  * @param {object} destination
  * @memberof TripService
  * @returns {object} data
  */
  static findMostTraveleddestinations() {
    return Trip.findAll({
      attributes: ['destinationId']
    });
  }
}


export default TripService;
