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
 *   Resend Account Verification Link:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       required:
 *         - email
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
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - User
 *     name: Logout
 *     summary: Logs out a user from system
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Succesful
 *       '401':
 *         description: No Token supplied
 */
/**
 * @swagger
 * /api/auth/protected:
 *   get:
 *     tags:
 *       - User
 *     name: Protected
 *     summary: Protected route that can be accessed only by logged in user
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Succesful
 *       '401':
 *         description: No Token supplied
 *
 */

/**
 * @swagger
 * definitions:
 *   findUser:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *       required:
 *         - email
 */

/**
 * @swagger
 * /api/auth/find-user:
 *   post:
 *     tags:
 *       - User
 *     name: Find User
 *     summary: Find a user in a system

 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/findUser'
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *         required:
 *           - email
 *     responses:
 *       '200':
 *         description: Check your email address,
 *                      copy the token and follow instruction
 *       '404':
 *         description: Email does not exists,
 *                      Enter valid email,
 *                      Please enter email
 */

/**
 * @swagger
 * definitions:
 *   resetPassword:
 *     type: object
 *     properties:
 *       newPassword:
 *         type: string
 *         format: password
 *       confirmPass:
 *         type: string
 *         format: password
 *       required:
 *         - newPassword
 *         - confirPass
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   put:
 *     tags:
 *       - User
 *     name: Reset Password
 *     summary: Reset user password
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/resetPassword'
 *           type: object
 *           properties:
 *             newPassword:
 *               type: string
 *               format: password
 *             confirmPass:
 *               type: string
 *               format: password
 *         required:
 *           - newPassword
 *           - confirmPass
 *     responses:
 *       '200':
 *         description: Password reset success
 *       '403':
 *         description: Forbidden,
 *                      Please check if the token is correct and try again to access this route
 *       '400':
 *         description: Password does not match,
 *                      Password should be at least 8 characters long,
 *                      Please input password
 */
/**
 * @swagger
 * /api/auth/user/verify:
 *   patch:
 *     tags:
 *       - User
 *     name: Verify Account
 *     summary: Verify Newly Created User's Account
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Account verified successfully. You can proceed to login
 *       '400':
 *         description: Bad Request
 *       '403':
 *         description: Forbiden
 */
/**
 * @swagger
 * /api/auth/user/resendLink:
 *   patch:
 *     tags:
 *       - User
 *     name: Resend Verification Link
 *     summary: Resend Account Verification Link
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Resend Account Verification Link'
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *         required:
 *           - email
 *     responses:
 *       '200':
 *             description: Verification Link Successfully Sent,
 *                          Visit Your Email To Activate Account
 *       '400':
 *             description: Bad request.
 *       '404':
 *             description: Email Not Found in The Database. To Get a Link You Must Register
 */
