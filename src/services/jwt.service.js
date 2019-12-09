import jwt from 'jsonwebtoken';

/**
 * Generate token
 * Verify token
 * @class AuthHandler
 */
class AuthHandler {
  /**
   *
   *
   * @param {data} data
   * @returns {token} @memberof AuthHandler
   */
  static generateToken(data) {
    const token = jwt.sign(
      data, process.env.SecretKey,
      { expiresIn: process.env.TokenExpireTime }
    );
    return token;
  }

  /**
   * @param {token} token
   *@return {result} @memberof AuthHandler
   */
  static verifyToken(token) {
    return jwt.verify(
      token, process.env.SecretKey,
      (err, decoded) => {
        if (err) {
          return err;
        }
        return decoded;
      }
    );
  }
}
export default AuthHandler;
