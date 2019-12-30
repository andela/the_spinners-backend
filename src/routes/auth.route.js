import express from 'express';
import passport from 'passport';
import AuthController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import RouteAccessMiddleware from '../middlewares/route-access.middleware';
import userValidation from '../validations/user.validation';
import '../config/passport';
import {
  validateSignup,
  validateLogin,
  validateResendVerificationLink,
  validateToken
} from '../validations/auth.validation';

const { checkUserExist, checkUserLoggedIn } = authMiddleware;


const router = express.Router();

router.post('/signup', validateSignup, AuthController.signUp); // API route for user to signup
router.post('/login', validateLogin, checkUserExist, AuthController.login); // API route for user to login
router.post('/logout', checkUserLoggedIn, AuthController.logout); // API for logout
router.post('/find-user', userValidation.findUserValidation, AuthController.findUserToSendEmail);
router.put('/reset-password', RouteAccessMiddleware.checkRouteAccess, userValidation.validateFields, AuthController.resetPassword); // API To find user for reset

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/redirect', passport.authenticate('google', { session: false, failureRedirect: '/login' }), AuthController.googleFacebookAuthHandler);

router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/redirect', passport.authenticate('facebook', { session: false, failureRedirect: '/login' }), AuthController.googleFacebookAuthHandler);

router.get('/protected', checkUserLoggedIn, (req, res) => {
  res.status(200).send('Welcome to the protected route');
});
router.patch('/user/verify', RouteAccessMiddleware.checkRouteAccess, validateToken, AuthController.verifyAccount);
router.patch('/user/resendLink', validateResendVerificationLink, AuthController.resendAccVerificationLink);
export default router;
