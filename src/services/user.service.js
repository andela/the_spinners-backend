import models from '../models';

const { Users } = models;

/**
 * @exports
 * @class UserService
 */
class UserService {
  /**
 * create new user
 * @static
 * @param {object} newUser
 * @memberof UserService
 * @returns {object} data
 */
  static addUser(newUser) {
    return Users.create(newUser);
  }

  /**
 * find user by email
 * @static
 * @param {object} userEmail
 * @memberof UserService
 * @returns {object} data
 */
  static findByEmail(userEmail) {
    return Users.findOne({
      where: {
        email: userEmail
      }
    });
  }

  /**
   *
   *
   * @static
   * @param {item} user user column to be updated
   * @param {value} userInfo to be updated
   * @returns {updated} @memberof UserService
   */
  static updateUser(user, userInfo) {
    return Users.update(userInfo, {
      where: user
    });
  }

  /**
   *
   * @param {string} token it acepts a valid token
   * @returns {boolean} returns true when token is found otherwise false
   */
  static findByToken({ token }) {
    return Users.findOne({
      where: { token }
    });
  }
}

export default UserService;
