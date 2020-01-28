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
      where: { ...param },
      order: [['status', 'ASC'], ['createdAt', 'DESC']]
    });
  }

  /**
   * Gets all request .
   * @param {object} param condition
   * @returns {object} The requests object.
   */
  static async getAndCountAllRequets(param, { offset, limit }) {
    return Request.findAndCountAll({
      where: { ...param },
      order: [['status', 'ASC'], ['createdAt', 'DESC']],
      offset,
      limit
    });
  }

  /** find Request
   * @static
   * @param {object} property
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findRequestByProperty(property) {
    return Request.findOne({
      where: { ...property }
    });
  }

  /**
   *
   *
   * @static
   * @param {item} requestId request column to be updated
   * @param {value} requestInfo to be updated
   * @returns {updated} @memberof RequestService
   */
  static updateRequest(requestId, requestInfo) {
    return Request.update(requestInfo, {
      where: requestId,
      individualHooks: true,
      returning: true
    });
  }
}


export default RequestService;
