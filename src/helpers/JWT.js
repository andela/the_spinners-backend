import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(403).json({
      status: 403,
      error: 'Access denied. Token is required'
    });
  }

  const userVerfication = jwt.verify(token, process.env.SECRET);
  req.userToken = userVerfication;
  next();
};

export default verifyToken;
