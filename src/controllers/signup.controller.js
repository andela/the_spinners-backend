import SignupService from '../services/signup.service';
import BcryptService from '../services/bcrypt.service';
import Response from '../helpers/response';

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
    const userExist = await SignupService.checkUserExistByEmail(req.body.email.trim());
    if (!userExist) {
      const userInput = {
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email.trim(),
        password: BcryptService.hashPassword(req.body.password.trim())
      };
      const createdUser = await SignupService.addUser(userInput);
      const {
        id, firstName, lastName, email, role, isVerified
      } = createdUser;
      const data = {
        id, firstName, lastName, email, role, isVerified
      };
      Response.setSuccess(201, 'User created successfully', data);
      return Response.send(res);
    }
    Response.setError(409, `${req.body.email.trim()} already exist`);
    return Response.send(res);
  }
}

export default UsersController;
