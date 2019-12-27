import ResponseService from '../services/response.service';

/**
 * class for validations
 */
class RouteAccessMiddleware {
  /**
 * @param {Request} req
 * @param {Response} res
 * @param {function} next
 * @returns {authorization} This function protects the reset password route
 */
  static checkRouteAccess(req, res, next) {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
      req.token = bearerHeader;
    } else {
      ResponseService.setError(403, 'Forbidden');
      return ResponseService.send(res);
    }
    next();
  }
}

export default RouteAccessMiddleware;
