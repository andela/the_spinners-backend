import jwt from 'jsonwebtoken';

/**
 * Generate token
 * Verify token
 * @class JwtService
 */
class JwtService {
  /**
   *
   *
   * @param {data} data
   * @returns {token} @memberof JwtService
   */
  static generateToken(data) {
    return jwt.sign(
      data, process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRE_TIME }
    );
  }

  /**
   * @param {token} token
   *@return {result} @memberof JwtService
   */
  static verifyToken(token) {
    return jwt.verify(
      token, process.env.SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return err;
        }
        return decoded;
      }
    );
  }
}
export default JwtService;
