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
   * find Request
   * @static
   * @param {object} property
   * @memberof AccommodationService
   * @returns {object} data
   */
  static findTypeByProperty(property) {
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
      returning: true
    });
  }

  /**
   *
   * @static
   * @param {property} property
   * @memberof TripService
   * @returns {object} this function finds all
   */
  static findAllByProperty(property) {
    return Request.findAll({
      where: {
        ...property
      }
    });
  }
}


export default RequestService;
