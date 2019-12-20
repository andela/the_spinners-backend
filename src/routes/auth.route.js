import express from 'express';
import authController from '../controllers/auth.controller';
import authMiddleware from '../middlewares/auth.middleware';
import { validateSignup, validateLogin } from '../validations/auth.validation';

const { checkUserExist, checkUserLoggedIn } = authMiddleware;

const router = express.Router();

router.post('/signup', validateSignup, authController.signUp); // API route for user to signup
router.post('/login', validateLogin, checkUserExist, authController.login); // API route for user to login
router.post('/logout', checkUserLoggedIn, authController.logout); // API for logout
router.get('/protected', checkUserLoggedIn, (req, res) => {
  res.status(200).send('Welcome to the protected route');
});
export default router;
