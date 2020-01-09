import userService from '../services/user.service';
import ResponseService from '../services/response.service';

const authorization = {
  checkManager: async (req, res, next) => {
    const { role } = await userService.findUserByProperty({ id: req.userData.id });
    if (role !== 'manager') {
      ResponseService.setError(403, 'Forbidden. Only Managers can perform this action');
      return ResponseService.send(res);
    }
    next();
  }
};

export default authorization;
