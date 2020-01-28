import SearchService from '../services/search.service';
import ResponseService from '../services/response.service';
import { paginationHelper } from '../helpers';

/**
 *
 *
 * @class SearchController
 */
class SearchController {
  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof SearchController
   */
  static async searchRequests(req, res) {
    const { location, name, status, departureDate, page = 1, limit = 20 } = req.query;
    const { userData } = req;
    const offset = (page - 1) * limit;

    const pagination = {
      limit,
      offset
    };
    const results = await SearchService.searchAll({
      userData,
      location,
      name,
      status,
      departureDate,
      pagination
    });
    if (results.rows.length === 0) {
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

export default SearchController;
