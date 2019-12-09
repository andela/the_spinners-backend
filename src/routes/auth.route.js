import express from 'express';
import UsersController from '../controllers/signup.controller';
import loginHandler from '../controllers/login.controller';
import authValidation from '../middlewares/login.middleware';
import { signupValidator, loginValidator } from '../validations/auth.validation';

const { userExist, isAccountActive } = authValidation;

const router = express.Router();

router.post('/signup', signupValidator, UsersController.signUp); // API route for user to signup
router.post('/login', loginValidator, userExist, isAccountActive, loginHandler.login); // API route for user to login
/**
 * @swagger
 * definitions:
 *   Signup:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *         format: email
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *   Login:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - User
 *     name: Signup
 *     summary: Signup a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Signup'
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - password
 *     responses:
 *       '201':
 *             description: User created.
 *       '400':
 *             description: Bad request.
 *       '409':
 *             description: User already exist.
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - User
 *     name: Login
 *     summary: Log a user in a system
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Login'
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User  logged in successfully
 *       '401':
 *         description: Incorrect credentials.
 */

export default router;
