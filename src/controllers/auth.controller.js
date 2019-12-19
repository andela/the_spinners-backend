import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';
import JwtService from '../services/jwt.service';


/**
 *
 *
 * @class AuthController
 */
class AuthController {
  /**
 * users can create an account
 * @static
 * @description POST /api/v1/signUp
 * @param {object} req request object
 * @param {object} res ResponseService object
 * @memberof AuthController
 * @returns {object} data
 */
  static async signUp(req, res) {
    const userExist = await UserService.findByEmail(req.body.email.trim());
    if (!userExist) {
      const userInput = {
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        password: BcryptService.hashPassword(req.body.password.trim())
      };
      const createdUser = await UserService.addUser(userInput);
      const {
        id, firstName, lastName, email, role, isVerified
      } = createdUser;
      const data = {
        id, firstName, lastName, email, role, isVerified
      };
      ResponseService.setSuccess(201, 'User created successfully', data);
      return ResponseService.send(res);
    }
    ResponseService.setError(409, `${req.body.email.trim()} already exist`);
    return ResponseService.send(res);
  }

  /**
   *
   *User can log in
   * @static
   * @param {req} req
   * @param {res} res
   * @returns {token} @memberof AuthController
   */
  static async login(req, res) {
    const user = await UserService.findByEmail(req.body.email.trim());
    const verifyPassword = BcryptService.verifyPassword(req.body.password.trim(), user.password);
    if (!verifyPassword) {
      ResponseService.setError(401, 'Authentication failed. Wrong Email or Password.');
      return ResponseService.send(res);
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };
    const token = JwtService.generateToken(payload);

    await UserService.updateUser({ id: user.id }, { token });
    ResponseService.setSuccess(200, 'Successfully logged in.. redirecting', token);
    ResponseService.send(res);
  }
}

export default AuthController;
