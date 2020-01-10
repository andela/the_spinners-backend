import RequestService from '../services/request.service';
import ResponseService from '../services/response.service';

/**
 *
 *
 * @class RequestController
 */
class RequestController {
  /**
   * @param {req} req
   * @param {res} res
   * @returns {requestLists} this function returns manager request list
  */
  static async findRequests(req, res) {
    const requests = await RequestService.getAllRequets({ lineManagerId: req.userData.id });
    ResponseService.setSuccess(200, 'List request directed to you', requests);
    return ResponseService.send(res);
  }
}

export default RequestController;
