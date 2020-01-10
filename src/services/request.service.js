import models from '../models';

const { Request } = models;

/**
 *
 *
 * @class RequestService
 */
class RequestService {
  /**
           *
           *
           * @static
           * @param {newRequest} newRequest
           * @returns {newRequest} @memberof RequestService
           */
  static createRequest(newRequest) {
    return Request.create(newRequest);
  }

  /**
   * Gets all request .
   * @param {object} param condition
   * @returns {object} The requests object.
   */
  static async getAllRequets(param) {
    return Request.findAll({
      where: param,
      order: [['status', 'ASC'], ['createdAt', 'DESC']]
    });
  }
}


export default RequestService;
