import models from '../models';

const { Booking } = models;

/**
 *
 *
 * @class BookingService
 */
class BookingService {
  /**
       * find Accommodation Booking
       * @static
       * @param {object} property
       * @memberof BookingService
       * @returns {object} data
       */
  static findBookingByProperty(property) {
    return Booking.findOne({
      where: property
    });
  }
}

export default BookingService;
