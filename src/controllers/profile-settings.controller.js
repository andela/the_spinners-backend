import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';
/**
 *
 *
 * @class ProfileSettingsController
 */
class ProfileSettingsController {
  /**
  * users can create an account
  * @static
  * @description POST /api/view-profile
  * @param {object} req request object
  * @param {object} res response object
  * @memberof ProfileSettingsController
  * @returns {object} ResponseService
  */
  static async viewProfile(req, res) {
    const userToken = JwtService.verifyToken(req.token);
    const registeredUser = await UserService
      .findUserByPropertyWithInclude({ email: userToken.email });
    const {
      password,
      token,
      isVerified,
      createdAt,
      updatedAt,
      ...datas
    } = registeredUser.dataValues;
    ResponseService.setSuccess(200, 'User Profile Found', datas);
    ResponseService.send(res);
  }

  /**
  * users can create an account
  * @static
  * @description POST /api/edit-profile
  * @param {object} req request object
  * @param {object} res response object
  * @memberof ProfileSettingsController
  * @returns {object} ResponseService
  */
  static async editProfile(req, res) {
    const userToken = JwtService.verifyToken(req.token);
    await Promise.all(Object.keys(req.body).map(async (key, index) => {
      await UserService.updateUser(
        { email: userToken.email },
        { [key]: (Object.values(req.body)[index]).trim() }
      );
    }));
    const userData = await UserService.findUserByProperty({ email: userToken.email });
    const { password, token, isVerified, createdAt, updatedAt, ...data } = userData.dataValues;
    ResponseService.setSuccess(200, 'Profile Updated successfully', data);
    ResponseService.send(res);
  }
}

export default ProfileSettingsController;
