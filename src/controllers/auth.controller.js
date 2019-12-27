import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';
import JwtService from '../services/jwt.service';
import SendEmailService from '../services/send-email.service';


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
    const userExist = await UserService.findUserByProperty({ email: req.body.email.trim() });
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
    const user = await UserService.findUserByProperty({ email: req.body.email.trim() });
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
    ResponseService.setSuccess(200, 'Successfully logged in', token);
    ResponseService.send(res);
  }

  /**
   * @description logs out a user
   *
   * @param {object} req request from body to log out
   * @param {object} res response to the body
   * @returns {object} @memberof AuthController
   */
  static async logout(req, res) {
    const token = null;
    await UserService.updateUser({ id: req.userData.id }, { token });
    ResponseService.setSuccess(200, 'Successful logout');
    return ResponseService.send(res);
  }

  /**
    * @param {Request} req
    * @param {Response} res
    * @returns {FindUser} this function finds if user exist in database
    */
  static async findUserToSendEmail(req, res) {
    const user = await UserService.findUserByProperty({ email: req.body.email.trim() });
    const { email } = user;
    const token = JwtService.generateToken({ email });
    const emailSubject = 'Request reset password';
    const emailBody = `Copy this token: <br><strong style="color:blue">${token}</strong><br> and include it in the header of <strong style="color:green">/api/resetpassword<strong> route.`;
    SendEmailService.sendGridEmail(email, token, emailSubject, emailBody);
    ResponseService.setSuccess(200, 'Check your email address, copy the token and follow instruction');
    ResponseService.send(res);
  }

  /**
  * @param {Request} req
  * @param {Response} res
  * @returns {resetPassword} the function reset a password of a user
  */
  static async resetPassword(req, res) {
    const { newPassword } = req.body;

    const hash = BcryptService.hashPassword(newPassword);
    UserService.updateUser({ email: req.userData.email }, { password: hash });
    ResponseService.setSuccess(200, 'Password reset success');
    ResponseService.send(res);
  }
}

export default AuthController;
