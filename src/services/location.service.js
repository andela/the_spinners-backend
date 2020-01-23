import models from '../models';

const { Location } = models;

/**
 *
 *
 * @class LocationService
 */
class LocationService {
  /**
 * find Location
 * @static
 * @param {object} property
 * @memberof LocationService
 * @returns {object} data
 */
  static findLocationByProperty(property) {
    return Location.findOne({
      where: { ...property }
    });
  }

  /**
 * find Location
 * @static
 * @param {object} property
 * @memberof LocationService
 * @returns {object} data
 */
  static findLocationsByProperty(property) {
    return Location.findAll({
      where: { ...property }
    });
  }
}


export default LocationService;
