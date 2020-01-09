/**
 * @swagger
 * /api/manager/requests:
 *   get:
 *     tags:
 *       - Manager
 *     name: Get all requests directed to manager
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
 *         description: List request directed to you
 *       '401':
 *         description: No Token supplied
 *
 */

/**
* @swagger
* definitions:
*   Request:
*     type: object
*     properties:
*       status:
*         type: string
*     required:
*         - status
*/

/**
 * @swagger
 * /api/manager/requests/{requestId}:
 *   patch:
 *     tags:
 *       - Manager
 *     name: Request
 *     summary: A manager should be able to approve or reject requests of his direct report
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *       - name: requestId
 *         in: path
 *       - name: status
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Request'
 *           type: object
 *     responses:
 *       '200':
 *         description: Request approved or rejected successfully
 *       '400':
 *         description: invalid parameters.
 *       '401':
 *         description: No valid token supplied
 *       '403':
 *         description: Unauthorized
 *       '422':
 *         description: Rejecting rejected or approved request
 */
