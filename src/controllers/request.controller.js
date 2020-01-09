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
   * @returns {requestLists} this function returns user request Lists
  */
  static async pendingRequestList(req, res) {
    const requests = await RequestService.findAllByProperty({ lineManagerId: req.userData.id, status: 'pending' });
    ResponseService.setSuccess(200, 'List of pending requests', requests);
    return ResponseService.send(res);
  }

  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof RequestController
   */
  static async updateRequestStatus(req, res) {
    let status;
    if (req.route.path === '/:requestId/approve') {
      status = 'approved';
      const [, [{ dataValues }]] = await RequestService
        .updateRequest({ id: req.params.requestId }, { status });
      ResponseService.setSuccess(200, 'Request has successfully approved', dataValues);
      return ResponseService.send(res);
    }
    status = 'rejected';
    const [, [{ dataValues }]] = await RequestService
      .updateRequest({ id: req.params.requestId }, { status });
    ResponseService.setSuccess(200, 'Request has successfully rejected', dataValues);
    return ResponseService.send(res);
  }
}

export default RequestController;
