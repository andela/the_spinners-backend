import SignupService from '../services/signup.service';
import passwordHandler from '../services/bcrypt';

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
      const hashedPassword = passwordHandler.hashPassword(req.body.password);
      req.body.password = hashedPassword;
      const createdUser = await SignupService.addUser(req.body);
      const {
        id, firstName, lastName, email, role, isVerified
      } = createdUser;
      const data = {
        id, firstName, lastName, email, role, isVerified
      };
      return res.status(201).send({ status: 201, message: 'User created successfully', data });
    }
    return res.status(409).send({ status: 409, error: `${req.body.email} already exist` });
  }
}

export default UsersController;
