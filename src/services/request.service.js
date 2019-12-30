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
}


export default RequestService;
