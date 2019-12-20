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
 * @param {object} property
 * @memberof UserService
 * @returns {object} data
 */
  static findUserByProperty(property) {
    return Users.findOne({
      where: property
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
}

export default UserService;
