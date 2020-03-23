import dotenv from 'dotenv';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import BcryptService from '../services/bcrypt.service';
import JwtService from '../services/jwt.service';
import SendEmailService from '../services/send-email.service';
import PreferenceService from '../services/preference.service';
import emailNotification from '../helpers/mails/email-notification.mail';

dotenv.config();

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
 * @param {object} res response object
 * @memberof AuthController
 * @returns {object} ResponseService
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
      // Set default notification
      await PreferenceService.createPreference({
        userId: id,
        isEmailNotification: false,
        isInAppNotification: true
      });
      SendEmailService.sendAccVerificationLink(email);
      ResponseService.setSuccess(201, 'User created successfully, Visit Your Email To Activate Account', data);
      return ResponseService.send(res);
    }
    ResponseService.setError(409, `${req.body.email.trim()} already exist`);
    return ResponseService.send(res);
  }

  /**
* users can verify his/her account
* @static
* @description PATCH /api/auth/account_verify
* @param {object} req request object
* @param {object} res response object
* @memberof AuthController
* @returns {object} ResponseService
*/
  static async verifyAccount(req, res) {
    const userToken = JwtService.verifyToken(req.token);
    const isUserRegistered = await UserService.findUserByProperty({ email: userToken.email });
    if (isUserRegistered && (isUserRegistered.isVerified) === true) {
      ResponseService.setError(400, 'Can\'t reverify this account. Account already verified.');
      ResponseService.send(res);
    } else {
      const userData = {
        id: isUserRegistered.id,
        firstName: isUserRegistered.firstName,
        lastName: isUserRegistered.lastName,
        email: isUserRegistered.email
      };
      const providedToken = JwtService.generateToken(userData);
      await UserService.updateUser({ email: userToken.email }, {
        isVerified: true, token: providedToken
      });
      ResponseService.setSuccess(200, 'Account verified successfully. You can proceed to login', providedToken);
      ResponseService.send(res);
    }
  }

  /**
* users can request a new verify link
* @static
* @description PATCH /api/auth/resend_verification_link
* @param {object} req request object
* @param {object} res response object
* @memberof AuthController
* @returns {object} ResponseService
*/
  static async resendAccVerificationLink(req, res) {
    const emailExist = await UserService.findUserByProperty({ email: req.body.email.trim() });
    if (emailExist) {
      SendEmailService.sendAccVerificationLink(req.body.email.trim());
      ResponseService.setSuccess(200, 'Verification Link Successfully Sent, Visit Your Email To Activate Account');
      ResponseService.send(res);
    } else {
      ResponseService.setSuccess(404, 'Email Not Found in The Database. To Get a Link You Must Register');
      ResponseService.send(res);
    }
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
    const notification = `<p>Click on the link below</p><br/><a style="background-color:#0074D9; display:block; width:50%; color: white; text-align:center; text-decoration:none;" href="https://spinners-frontend-stage.herokuapp.com/reset-password?token=${token}">RESET PASSWORD</a>`;
    const emailBody = emailNotification(user.firstName, notification);
    SendEmailService.sendGridEmail(email, emailSubject, emailBody);
    ResponseService.setSuccess(200, 'Check your email and follow instructions');
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

  /**
  * @static
  * @param {*} req
  * @param {*} res
  * @memberof AuthController
  * @returns {*} data
  */
  static async googleFacebookAuthHandler(req, res) {
    const token = JwtService.generateToken({ id: req.user.id, email: req.user.email });
    await UserService.updateUser({ id: req.user.id }, { token });
    return res.redirect(`${process.env.FRONTEND_URL}/facebook/redirect?token=${token}`);
  }
}

export default AuthController;
