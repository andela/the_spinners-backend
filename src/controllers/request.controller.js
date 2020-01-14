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

  /**
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof RequestController
   */
  static async updateRequestStatus(req, res) {
    const [, [{ dataValues }]] = await RequestService.updateRequest({ id: req.params.requestId }, { status: `${req.body.status}` });
    ResponseService.setSuccess(200, `Request has successfully ${dataValues.status}`, dataValues);
    return ResponseService.send(res);
  }
}

export default RequestController;
