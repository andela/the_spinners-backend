import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import { paginationHelper } from '../helpers';
/**
 *
 *
 * @class SettingsController
 */
class SettingsController {
  /**
  * super_admin can assign a role to user by email
  * @static
  * @description PATCH /api/admin/reset-user-role
  * @param {object} req request object
  * @param {object} res response object
  * @memberof UserRoleSettingsController
  * @returns {object} ResponseService
  */
  static async changeUserRole(req, res) {
    const { userEmail, userRole } = req.body;
    const findUser = await UserService.findUserByProperty({ email: userEmail.trim() });
    if (findUser && findUser.role !== 'super_admin') {
      await UserService.updateUser({ email: userEmail.trim() }, { role: userRole.trim() });
      ResponseService.setSuccess(200, 'User role successfully updated', { role: userRole });
      ResponseService.send(res);
    } else {
      ResponseService.setError(404, `User role not updated. ${userEmail.trim()} is either a super admin or Not Registered`);
      ResponseService.send(res);
    }
  }

  /**
   * @param {req} req
   * @param {res} res
   * @returns {response} @memberof SettingsController
  */
  static async assignRequesterToManager(req, res) {
    const { userId } = req.params;
    const { lineManagerId } = req.body;
    const [, [{ dataValues }]] = await UserService.updateUser({ id: userId }, { lineManagerId });
    ResponseService.setSuccess(200, 'Requester is successfully assigned to a manager', { lineManagerId: dataValues.lineManagerId });
    ResponseService.send(res);
  }

  /**
  * super_admin can view all user's roles
  * @static
  * @description GET /api/settings/view-users-roles
  * @param {object} req request object
  * @param {object} res response object
  * @memberof UserRoleSettingsController
  * @returns {object} ResponseService
  */
  static async ListUsersRoles(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const results = await UserService.findAllRequesters({ role: 'requester' }, { offset, limit });
    ResponseService.setSuccess(200, 'List of users and their respective roles', {
      pageMeta: paginationHelper({
        count: results.count, rows: results.rows, offset, limit
      }),
      rows: results.rows
    });
    return ResponseService.send(res);
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} This function returns a list of managers
   * @memberof SettingsController
   */
  static async viewManagers(req, res) {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const results = await UserService.findAllManagers({ role: 'manager' }, { offset, limit });
    ResponseService.setSuccess(200, 'List of Managers', {
      pageMeta: paginationHelper({
        count: results.count, rows: results.rows, offset, limit
      }),
      rows: results.rows
    });
    return ResponseService.send(res);
  }
}
export default SettingsController;
