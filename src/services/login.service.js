import models from '../models';

const { Users } = models;
/**
 *
 *
 * @class userHandler
 */
class UserHandler {
  /**
   *
   *
   * @static
   * @param {params} params
   * @returns {user} @memberof userHandler
   */
  static getByEmail(params) {
    return Users.findOne({
      where: {
        email: params.email
      },
      logging: false
    });
  }

  /**
   *
   *
   * @static
   * @param {item} user
   * @param {value} token
   * @returns {updated} @memberof userHandler
   */
  static updateToken(user, token) {
    return Users.update({ token }, {
      where: {
        id: user.id
      },
      logging: false
    });
  }

  /**
   *
   * @param {string} token it acepts a valid token
   * @returns {boolean} returns true when token is found otherwise false
   */
  static findByToken({ token }) {
    return Users.findOne({
      where: { token },
      logging: false
    });
  }
}
export default UserHandler;
