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
 * find user property with include
 * @static
 * @param {object} property
 * @memberof UserService
 * @returns {object} data
 */
  static findUserByPropertyWithInclude(property) {
    return Users.findOne({
      where: property,
      include: ['preferences']
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
      where: user,
      returning: true
    });
  }

  /**
 *
 * @static
 * @param {property} property
 * @memberof UserService
 * @returns {object} this function finds all
 */
  static findAllByProperty(property) {
    return Users.findAll({
      where: {
        ...property
      }
    });
  }

  /**
*
* @static
* @param {property} property
* @memberof UserService
* @returns {object} this function finds all
*/
  static findAllUsersRoles({ offset, limit }) {
    return Users.findAndCountAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'role',
        'profilePicture'
      ],
      offset,
      limit,
      order: [
        ['id', 'DESC']
      ]
    });
  }
}

export default UserService;
