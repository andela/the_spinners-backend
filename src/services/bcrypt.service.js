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
    return bcrypt.hashSync(
      password, bcrypt.genSaltSync(
        Number(process.env.SaltRounds)
      )
    );
  }
}

export default BcryptService;
