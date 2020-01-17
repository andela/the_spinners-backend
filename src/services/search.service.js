import { Op } from 'sequelize';
import TripService from './trip.service';
import RequestService from './request.service';
import UserService from './user.service';

/**
 *
 *
 * @class searchService
 */
class SearchService {
  /**
   *
   *
   * @static
   * @param {req} locationName
   * @returns {response} @memberof SearchService
   */
  static async getLocationIdQuery(locationName) {
    const locations = await TripService.findAllLocations({
      [Op.or]: [{ country: { [Op.iLike]: `%${locationName}%` } }, { city: { [Op.iLike]: `%${locationName}%` } }]
    });
    const locationIds = locations.map((location) => {
      const { id } = location.get();
      return id;
    });
    return locationIds;
  }

  /**
 *
 *
 * @static
 * @param {req} stringDate
 * @returns {response} @memberof SearchService
 */
  static getDateQuery(stringDate) {
    const date = Number.isNaN(Date.parse(stringDate)) ? null : new Date(stringDate);
    const filterByDate = !date ? { departureDate: null } : {
      departureDate: { [Op.between]: [new Date(`${stringDate} 00:00:00`), new Date(`${stringDate} 23:59:59`)] }
    };
    return filterByDate;
  }

  /**
 *
 *
 * @static
 * @param {req} statusName
 * @returns {response} @memberof SearchService
 */
  static getStatusQuery(statusName) {
    if (['approved', 'rejected', 'pending'].includes(statusName)) {
      const status = {
        status: statusName
      };
      return status;
    }
    return { status: null };
  }

  /**
 *
 *
 * @static
 * @param {req} name
 * @returns {response} @memberof SearchService
 */
  static async getRequesterQuery(name) {
    const requesters = await UserService.findAllByProperty({
      [Op.or]: [{ firstName: { [Op.iLike]: `%${name}%` } }, { lastName: { [Op.iLike]: `%${name}%` } }]
    });
    const requestersIds = requesters.map((requester) => requester.get().id);
    return { requesterId: { [Op.in]: requestersIds } };
  }

  /**
 *
 *
 * @static
 * @param {req} location
 *  @param {object} pagination
 * @returns {response} @memberof SearchService
 */
  static async searchByLocation({ location, pagination }) {
    const locationIds = await SearchService.getLocationIdQuery(location);
    const tripsData = await TripService.findAllByProperty({
      [Op.or]: [{ originId: { [Op.in]: locationIds } }, { destinationId: { [Op.in]: locationIds } }]
    });
    const tripIds = tripsData.map((tripData) => {
      const { tripId } = tripData.get();
      return tripId;
    });
    const requestsData = await RequestService.getAndCountAllRequets({
      tripId: { [Op.in]: tripIds }
    }, pagination);
    return requestsData;
  }

  /**
 *
 *
 * @static
 * @param {req} userData
 *  @param {req} term
 *  @param {object} pagination
 * @returns {response} @memberof SearchService
 */
  static async searchByRequesterName({ userData, name, pagination }) {
    const user = await UserService.findUserByProperty({ id: userData.id });
    if (user.get().role === 'manager') {
      const filterByUser = await SearchService.getRequesterQuery(name);
      const requestsData = await RequestService.getAndCountAllRequets(filterByUser, pagination);
      return requestsData;
    }
    return { count: 0, rows: [] };
  }

  /**
 *
 *
 * @static
 * @param {req} status
 * @param {object} pagination
 * @returns {response} @memberof SearchService
 */
  static async searchByStatus({ status, pagination }) {
    const filterByStatus = SearchService.getStatusQuery(status);
    const requestsData = await RequestService.getAndCountAllRequets(filterByStatus, pagination);
    return requestsData;
  }

  /**
 *
 *
 * @static
 * @param {req} departureDate
 *  @param {object} pagination
 * @returns {response} @memberof SearchService
 */
  static async searchByDepartureDate({ departureDate, pagination }) {
    const filterByDate = SearchService.getDateQuery(departureDate);
    const tripsData = await TripService.findAllByProperty(filterByDate);
    const tripIds = tripsData.map((tripData) => {
      const { tripId } = tripData.get();
      return tripId;
    });
    const requestsData = await RequestService.getAndCountAllRequets({
      tripId: { [Op.in]: tripIds }
    }, pagination);
    return requestsData;
  }
}

export default SearchService;
