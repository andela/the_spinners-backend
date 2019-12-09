import express from 'express';
import UsersController from '../controllers/signupController';
import signUpSchema from '../middlewares/signUpValidation';

const router = express.Router();

router.post('/api/v1/signup', signUpSchema, UsersController.signUp); // API route for user to signup

export default router;
