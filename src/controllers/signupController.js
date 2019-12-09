import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import SignupService from '../services/signupService';

dotenv.config();
/**
 *
 *
 * @class UsersController
 */
class UsersController {
  static async signUp(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).send({ status: 400, error: 'All fields are required.'});
    } else {
      const userExist = await SignupService.checkUserExistByEmail(req.body.email);
      if (!userExist) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        const createdUser = await SignupService.addUser(req.body);
        const token = jwt.sign({ id: createdUser.id, username: createdUser.username,
          email: createdUser.email, role: createdUser.role, isVerified: createdUser.isVerified
        }, process.env.secretKey);
        res.header('x-auth-token', token);
        const { id, firstName, lastName, username, email, role, isVerified} = createdUser;
        const data = { token, id, firstName, lastName, username, email, role, isVerified };
        return res.status(201).send({ status: 201, message: 'User created successfully', data});
      } else {
        return res.status(409).send({ status: 409, error: `${req.body.email} already exist` });
      }
    }
  }
}

export default UsersController;
