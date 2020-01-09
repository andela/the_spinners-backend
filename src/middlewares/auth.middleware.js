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
  }
};


export default authMiddleware;
