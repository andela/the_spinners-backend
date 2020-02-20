import { Op } from 'sequelize';
import ResponseService from '../services/response.service';
import UserService from '../services/user.service';
import JwtService from '../services/jwt.service';


const authMiddleware = {
  checkUserExist: async (req, res, next) => {
    const user = await UserService.findUserByProperty({ email: req.body.email.trim() });
    if (!user) {
      ResponseService.setError(401, 'You don\'t have an account. Please create an account');
      return ResponseService.send(res);
    }
    next();
  },
  checkIfUserHaveManager: async (req, res, next) => {
    const { lineManagerId } = await UserService.findUserByProperty({ email: req.userData.email });
    if (lineManagerId === null || lineManagerId === undefined) {
      ResponseService.setError(403, 'You don\'t have manager assigned yet. Please contact Admin');
      return ResponseService.send(res);
    }
    next();
  },
  checkUserLoggedIn: async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      const { name } = JwtService.verifyToken(token);
      if (name === 'JsonWebTokenError') {
        ResponseService.setError(401, 'Unauthorized access. Invalid token');
        return ResponseService.send(res);
      }
      // Check if User has signed out and we blocked the token
      const user = await UserService.findUserByProperty({ token });
      if (!user) {
        ResponseService.setError(401, 'Unauthorized access. Invalid token for this user');
        return ResponseService.send(res);
      }
      req.userData = user.dataValues;
      next();
    } else {
      ResponseService.setError(401, 'No Token supplied');
      return ResponseService.send(res);
    }
  },
  checkIfUserIsManager: async (req, res, next) => {
    const { role } = await UserService.findUserByProperty({ id: req.userData.id });
    if (role !== 'manager') {
      ResponseService.setError(403, 'Forbidden. Only Managers can perform this action');
      return ResponseService.send(res);
    }
    next();
  },
  verifyIfUserIsAdmin: async (req, res, next) => {
    const userToken = req.userData;
    const userData = await UserService.findUserByProperty({ email: userToken.email });
    if (userData.role !== 'super_admin') {
      ResponseService.setError(403, 'Only super admin can reset user role');
      return ResponseService.send(res);
    }
    next();
  },
  verifyIfUserIsAdminById: async (req, res, next) => {
    const tokenData = req.userData;
    const userData = await UserService.findUserByProperty({ id: tokenData.id });
    if (userData.role !== 'super_admin') {
      ResponseService.setError(403, 'You are not a super admin.Action not performed');
      return ResponseService.send(res);
    }
    next();
  },
  verifyPermissions: async (req, res, next) => {
    const userData = await UserService
      .findUserByProperty({
        email: req.userData.email,
        role: {
          [Op.or]: ['travel_team_member', 'travel_admin']
        }
      });
    if (!userData) {
      ResponseService.setError(403, 'Only travel admin and travel team member can create accommodation');
      return ResponseService.send(res);
    }
    next();
  }
};


export default authMiddleware;
