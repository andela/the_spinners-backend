import model from '../models';

const { Users } = model;
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
  static addUser(newUser) {
    return Users.create(newUser);
  }

  /**
 * find user by email
 * @static
 * @param {object} userEmail
 * @memberof SignupService
 * @returns {object} data
 */
  static checkUserExistByEmail(userEmail) {
    return Users.findOne({ where: { email: userEmail } });
  }
}

export default SignupService;
