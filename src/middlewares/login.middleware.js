import Response from '../services/response';
import UserService from '../services/login.service';
import AuthHandler from '../services/jwt.service';

const authValidation = {
  userExist: async (req, res, next) => {
    const user = await UserService.getByEmail(req.body);
    if (!user) {
      Response.setError(401, 'You don\'t have an account. Please create an account');
      return Response.send(res);
    }
    next();
  },
  isAccountActive: async (req, res, next) => {
    const user = await UserService.getByEmail(req.body);
    if (!user.isVerified) {
      Response.setError(400, 'You have not activated your account. Please activate your account first');
      return Response.send(res);
    }
    next();
  },

  isloggedIn: async (req, res, next) => {
    let token = req.headers.authorization || req.headers['x-access-token'] || req.body.token || req.query.slt;

    if (token) {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      const { name } = AuthHandler.verifyToken(token);
      if (name === 'JsonWebTokenError') {
        Response.setError(401, 'Unauthorized access. Invalid token');
        return Response.send(res);
      }
      // Check if User has signed out and we blocked the token
      const user = await UserService.findByToken({ token });
      if (!user) {
        Response.setError(401, 'Unauthorized access. Invalid token for this user');
        return Response.send(res);
      }
      req.userData = user.dataValues;
      next();
    } else {
      Response.setError(401, 'No Token supplied');
      return Response.send(res);
    }
  }
};


export default authValidation;
