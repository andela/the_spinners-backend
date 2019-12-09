import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import SignupService from '../services/signupService';

dotenv.config();
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
      const hashedPassword = bcrypt.hashSync(req.body.password, 10);
      req.body.password = hashedPassword;
      const createdUser = await SignupService.addUser(req.body);
      const {
        id, firstName, lastName, email, username, role, isVerified
      } = createdUser;
      const token = jwt.sign({
        id, email, username, role, isVerified
      }, process.env.secretKey);
      res.header('x-auth-token', token);
      const data = {
        token, id, firstName, lastName, email, username, role, isVerified
      };
      return res.status(201).send({ status: 201, message: 'User created successfully', data });
    }
    return res.status(409).send({ status: 409, error: `${req.body.email} already exist` });
  }
}

export default UsersController;
