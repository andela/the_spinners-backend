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
 * /api/users/settings/reset-roles:
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
