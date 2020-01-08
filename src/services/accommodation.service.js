import models from '../models';

const { Accommodation, AccommodationType } = models;

/**
 *
 *
 * @class AccommodationService
 */
class AccommodationService {
  /**
         *
         *
         * @static
         * @param {newAccommodation} newAccommodation
         * @returns {newAccommodation} @memberof AccommodationService
         */
  static createAccommodation(newAccommodation) {
    return Accommodation.create(newAccommodation);
  }

  /**
   * find AccommodationType
   * @static
   * @param {object} property
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findAllType() {
    return AccommodationType.findAll();
  }

  /**
   * find AccommodationType
   * @static
   * @param {object} property
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findTypeByProperty(property) {
    return AccommodationType.findOne({
      where: { ...property }
    });
  }
}

export default AccommodationService;
