import express from 'express';
import UsersController from '../controllers/signupController';

const router = express.Router();

router.post('/api/v1/signup', UsersController.signUp); // API route for user to signup

export default router;
