/**
 * @swagger
 * definitions:
 *   Edit Account Profile Settings:
 *     type: object
 *     properties:
 *       gender:
 *         type: string
 *       birthDate:
 *         type: string
 *       preferredLanguage:
 *         type: string
 *       preferredCurrency:
 *         type: string
 *       residence:
 *         type: string
 *       department:
 *         type: string
 */

/**
 * @swagger
 * /api/users/view-profile:
 *   get:
 *     tags:
 *       - User
 *     name: View Profile
 *     summary: View User Account Profile
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
 *         description: User Profile Found
 *       '400':
 *         description: Bad Request
 *       '403':
 *         description: Forbiden
 */

/**
 * @swagger
 * /api/users/edit-profile:
 *   patch:
 *     tags:
 *       - User
 *     name: Edit Profile
 *     summary: Edit User Account Profile
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
 *           $ref: '#/definitions/Edit Account Profile Settings'
 *           type: object
 *           properties:
 *             gender:
 *               type: string
 *             birthDate:
 *               type: string
 *             preferredLanguage:
 *               type: string
 *             preferredCurrency:
 *               type: string
 *             residence:
 *               type: string
 *             department:
 *               type: string
 *             profilePicture:
 *               type: string
 *     responses:
 *       '200':
 *             description: Profile Updated successfully.
 *       '400':
 *             description: Bad request.
 *       '403':
 *             description: Forbiden.
 *
 */
