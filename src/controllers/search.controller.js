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
    const { term, page, limit } = req.query;
    const { userData } = req;
    const offset = (page - 1) * limit;

    const pagination = {
      limit,
      offset: Number.isNaN(offset) ? undefined : offset
    };
    const results = await SearchService.searchAll(userData, term, pagination);
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
