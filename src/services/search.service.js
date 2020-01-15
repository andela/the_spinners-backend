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
   * @param {req} term
   * @returns {response} @memberof SearchService
   */
  static async getLocationIdQuery(term) {
    const locations = await TripService.findAllLocations({
      [Op.or]: [{ country: { [Op.iLike]: `%${term}%` } }, { city: { [Op.iLike]: `%${term}%` } }]
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
 * @param {req} term
 * @returns {response} @memberof SearchService
 */
  static getDateQuery(term) {
    const date = Number.isNaN(Date.parse(term)) ? null : new Date(term);
    const filterByDate = !date ? {} : {
      departureDate: { [Op.between]: [new Date(`${term} 00:00:00`), new Date(`${term} 23:59:59`)] }
    };
    return filterByDate;
  }

  /**
 *
 *
 * @static
 * @param {req} term
 * @returns {response} @memberof SearchService
 */
  static getStatusQuery(term) {
    if (term === 'approved' || term === 'rejected' || term === 'pending') {
      const status = {
        status: term
      };
      return status;
    }
    return {};
  }

  /**
 *
 *
 * @static
 * @param {req} userData
 * @param {req} term
 * @returns {response} @memberof SearchService
 */
  static async getRequesterQuery(userData, term) {
    const user = await UserService.findUserByProperty({ id: userData.id });
    if (user.get().role === 'manager') {
      const requesters = await UserService.findAllByProperty({
        [Op.or]: [{ firstName: { [Op.iLike]: `%${term}%` } }, { lastName: { [Op.iLike]: `%${term}%` } }]
      });
      const requestersIds = requesters.map((requester) => requester.get().id);
      return { requesterId: { [Op.in]: requestersIds } };
    }
    return {};
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
  static async searchAll(userData, term, pagination) {
    const ids = await SearchService.getLocationIdQuery(term);
    const filterByDate = SearchService.getDateQuery(term);
    const tripsData = await TripService.findAllByProperty({
      [Op.or]: [{ originId: { [Op.in]: ids } }, { destinationId: { [Op.in]: ids } }, filterByDate]
    });
    const tripIds = tripsData.map((tripData) => {
      const { tripId } = tripData.get();
      return tripId;
    });
    const filterByRequester = await SearchService.getRequesterQuery(userData, term);
    const filterByStatus = SearchService.getStatusQuery(term);
    const requestsData = await RequestService.getAndCountAllRequets({
      [Op.or]: [{ tripId: { [Op.in]: tripIds } }, filterByStatus, filterByRequester]
    }, pagination);
    return requestsData;
  }
}

export default SearchService;
