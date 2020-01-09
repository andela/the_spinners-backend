import RequestService from '../services/request.service';
import ResponseService from '../services/response.service';

/**
 *
 *
 * @class RequestController
 */
class RequestController {
  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof RequestController
   */
  static async rejectRequest(req, res) {
    const [, [{ dataValues }]] = await RequestService.updateRequest({ id: req.params.requestId }, { status: 'rejected' });
    ResponseService.setSuccess(200, 'Request has successfully rejected', dataValues);
    return ResponseService.send(res);
  }
}

export default RequestController;
