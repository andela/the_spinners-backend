import bcrypt from 'bcrypt';

/**
 * @exports
 * @class passwordHandler
 */
class passwordHandler {
  /**
 * users can create an account
 * @static
 * @param {string} password
 * @param {string} Salt
 * @memberof passwordHandler
 * @returns {object} hash
 */
  static hashPassword(password) {
    return bcrypt.hashSync(password,
      bcrypt.genSaltSync(Number(process.env.saltRounds)));
  }
}

export default passwordHandler;
