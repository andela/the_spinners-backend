import models from '../models';


const { Accommodation, Booking, AccommodationType, Rooms } = models;

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
   * @static
   * @param {*} data
   * @returns {*} newAccomodation
   * @memberof AccommodationService
   */
  static createAccommodationWithInclude(data) {
    return Accommodation.create(data, {
      include: ['addOnServices', 'accommodationPictures', 'amenities',
        {
          association: 'rooms',
          include: ['roomPictures']
        }
      ]
    });
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
   * @param {object} primaryKey
   * @param {object} includeConditions
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findAccommodationWithInclude(primaryKey, includeConditions) {
    return Accommodation.findByPk(primaryKey, includeConditions);
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
      where: property
    });
  }

  /**
   * find Accommodation type
   * @static
   * @param {object} type
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findAccommodationType(type) {
    return AccommodationType.findOne({
      where: type
    });
  }

  /**
   * Update
   * @static
   * @param {object} condition
   * @param {object} data
   * @memberof AccommodationService
   * @returns {object} data
   */
  static updateRoom(condition, data) {
    return Rooms.update(data, {
      where: condition,
      returning: true
    });
  }


  /**
   * Update
   * @static
   * @param {object} property
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findBookingByProperty(property) {
    return Booking.findAll({
      where: property
    });
  }
}

export default AccommodationService;
