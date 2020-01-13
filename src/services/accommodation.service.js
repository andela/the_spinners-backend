import models from '../models';

const { Accommodation, Booking } = models;

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
         * @param {newBooking} newBooking
         * @returns {newBooking} @memberof AccommodationService
         */
  static createBooking(newBooking) {
    return Booking.create(newBooking);
  }

  /**
   * find Accommodation
   * @static
   * @param {object} property
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findAllAccommodations() {
    return Accommodation.findAll();
  }

  /**
   * find Accommodation
   * @static
   * @param {object} property
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findAccommodationByProperty(property) {
    return Accommodation.findOne({
      where: { ...property }
    });
  }
}

export default AccommodationService;
