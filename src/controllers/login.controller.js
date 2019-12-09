import Response from '../services/response';
import UserHandler from '../services/login.service';
import BcryptService from '../services/bcrypt.service';
import AuthHandler from '../services/jwt.service';

/**
 *
 *
 * @class loginHandler
 */
class loginHandler {
  /**
   *
   *
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {token} @memberof loginHandler
   */
  static async login(req, res) {
    const user = await UserHandler.getByEmail(req.body);
    const verifyPassword = BcryptService.verifyPassword(req.body.password, user.password);
    if (!verifyPassword) {
      Response.setError(401, 'Authentication failed. Wrong Email or Password.');
      return Response.send(res);
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    const token = AuthHandler.generateToken(payload);
    await UserHandler.updateToken(user, token);
    Response.setSuccess(200, 'Successfully logged in.. redirecting', token);
    Response.send(res);
  }
}

export default loginHandler;
