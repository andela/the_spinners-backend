import express from 'express';
import AuthController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateSignup, validateLogin } from '../validations/auth.validation';
import RouteAccessMiddleware from '../middlewares/route-access.middleware';
import userValidation from '../validations/user.validation';

const { checkUserExist, checkUserLoggedIn } = authMiddleware;


const router = express.Router();

router.post('/signup', validateSignup, AuthController.signUp); // API route for user to signup
router.post('/login', validateLogin, checkUserExist, AuthController.login); // API route for user to login
router.post('/logout', checkUserLoggedIn, AuthController.logout); // API for logout
router.post('/find-user', userValidation.findUserValidation, AuthController.findUserToSendEmail);
router.put('/reset-password', RouteAccessMiddleware.checkRouteAccess, userValidation.validateFields, AuthController.resetPassword); // API To find user for reset

router.get('/protected', checkUserLoggedIn, (req, res) => {
  res.status(200).send('Welcome to the protected route');
});
export default router;
