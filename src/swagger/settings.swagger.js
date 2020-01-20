/**
 * @swagger
 * definitions:
 *   Super Admin Set or Reset User Role:
 *     type: object
 *     properties:
 *       userEmail:
 *         type: string
 *         format: email
 *       userRole:
 *         type: string
 */

/**
 * @swagger
 * /api/users/settings/roles:
 *   patch:
 *     tags:
 *       - User
 *     name: Set or Reset User Role
 *     summary: Edit User Role By Super Admin
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Super Admin Set or Reset User Role'
 *           type: object
 *           properties:
 *             userEmail:
 *               type: string
 *             userRole:
 *               type: string
 *     responses:
 *       '200':
 *             description: User Role Updated successfully.
 *       '400':
 *             description: Bad request.
 *       '401':
 *             description: No Token Supplied.
 *       '403':
 *             description: Forbiden.
 *       '404':
 *             description: User Not Found
 *
 */

/**
 * @swagger
 * /api/users/settings/{userId}/line-manager/{lineManagerId}:
 *   patch:
 *     tags:
 *       - User
 *     name: Set or Reset User Role
 *     summary: Assign a requester to a manager
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: lineManagerId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *             description: Requester is successfully assigned to a manager.
 *       '400':
 *             description: Bad request.
 *       '401':
 *             description: No Token Supplied.
 *       '403':
 *             description: Unauthorized. only super admin can assign manager.
 *       '404':
 *             description: User not found
 *
 */
