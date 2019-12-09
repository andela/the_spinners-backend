import bcrypt from 'bcrypt';

/**
 * @exports
 * @class passwordHandler
 */
class BcryptService {
  /**
 * users can create an account
 * @static
 * @param {string} password
 * @param {string} Salt
 * @memberof passwordHandler
 * @returns {object} hash
 */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(Number(process.env.SaltRounds)));
  }

  /**
   *
   * @param {myPassword} myPassword
   * @param {dbPassword} dbPassword
   * @return {result} @memberof BcryptService
   */
  static verifyPassword(myPassword, dbPassword) {
    return bcrypt.compareSync(myPassword, dbPassword);
  }
}
export default BcryptService;
