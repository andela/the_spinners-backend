import SignupService from '../services/signup.service';
import BcryptService from '../services/bcrypt.service';
import Response from '../helpers/response';

const response = new Response();
/**
 * @exports
 * @class UsersController
 */
class UsersController {
  /**
 * users can create an account
 * @static
 * @description POST /api/v1/signUp
 * @param {object} req request object
 * @param {object} res response object
 * @memberof UsersController
 * @returns {object} data
 */
  static async signUp(req, res) {
    const userExist = await SignupService.checkUserExistByEmail(req.body.email);
    if (!userExist) {
      const hashedPassword = BcryptService.hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const createdUser = await SignupService.addUser(req.body);
      const {
        id, firstName, lastName, email, role, isVerified
      } = createdUser;
      const data = {
        id, firstName, lastName, email, role, isVerified
      };
      response.setSuccess(201, 'User created successfully', data);
      return response.send(res);
    }
    response.setError(409, `${req.body.email} already exist`);
    return response.send(res);
  }
}

export default UsersController;
