import bcrypt from 'bcrypt';

/**
 * @exports
 * @class BcryptService
 */
class BcryptService {
  /**
 * users can create an account
 * @static
 * @param {string} password
 * @param {string} Salt
 * @memberof BcryptService
 * @returns {object} hash
 */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS)));
  }

  /**
   *
   * @param {myPassword} inputPassword
   * @param {dbPassword} passwordFromDb
   * @return {result} @memberof BcryptService
   */
  static verifyPassword(inputPassword, passwordFromDb) {
    return bcrypt.compareSync(inputPassword, passwordFromDb);
  }
}
export default BcryptService;
