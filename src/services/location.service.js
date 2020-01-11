import models from '../models';

const { Location } = models;

/**
 *
 *
 * @class LocationService
 */
class LocationService {
  /**
 * find One Location
 * @static
 * @param {object} property
 * @memberof LocationService
 * @returns {object} data
 */
  static findLocationByProperty(property) {
    return Location.findOne({
      where: property
    });
  }

  /**
* find All Locations
* @static
* @param {object} property
* @memberof LocationService
* @returns {object} data
*/
  static findAllLocationByProperty(property) {
    return Location.findAll({
      where: property
    });
  }
}


export default LocationService;
