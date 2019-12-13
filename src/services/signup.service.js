import models from '../models';

const { Users } = models;

/**
 * @exports
 * @class SignupService
 */
class SignupService {
  /**
 * create new user
 * @static
 * @param {object} newUser
 * @memberof SignupService
 * @returns {object} data
 */
  static async addUser(newUser) {
    const newCreatedUSer = await Users.create(newUser);
    return newCreatedUSer;
  }

  /**
 * find user by email
 * @static
 * @param {object} userEmail
 * @memberof SignupService
 * @returns {object} data
 */
  static async checkUserExistByEmail(userEmail) {
    const foundUserByEmail = await Users.findOne({ where: { email: userEmail } });
    return foundUserByEmail;
  }
}

export default SignupService;
