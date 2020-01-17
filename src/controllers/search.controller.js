import SearchService from '../services/search.service';
import ResponseService from '../services/response.service';
import { paginationHelper } from '../helpers';

/**
 *
 *
 * @class searchController
 */
class searchController {
  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof searchController
   */
  static async searchRequests(req, res) {
    const { location, name, status, departureDate, page = 1, limit = 20 } = req.query;
    const { userData } = req;
    const offset = (page - 1) * limit;

    const pagination = {
      limit,
      offset
    };
    let results;
    if (location) {
      results = await SearchService.searchByLocation({ location, pagination });
    }
    if (name) {
      results = await SearchService.searchByRequesterName({ userData, name, pagination });
    }
    if (status) {
      results = await SearchService.searchByStatus({ status, pagination });
    }
    if (departureDate) {
      results = await SearchService.searchByDepartureDate({ departureDate, pagination });
    }
    if (results === undefined || results.rows.length === 0) {
      ResponseService.setSuccess(404, 'No results found');
      return ResponseService.send(res);
    }
    ResponseService.setSuccess(200, 'Search results', {
      pageMeta: paginationHelper({
        count: results.count, rows: results.rows, ...pagination
      }),
      rows: results.rows
    });
    return ResponseService.send(res);
  }
}

export default searchController;
