/**
* @swagger
* definitions:
*   Request:
*     type: object
*     properties:
*       typeId:
*         type: integer
*       from:
*         type: string
*       to:
*         type: string
*     required:
*         - typeId
*         - from
*         - to
*/

/**
 * @swagger
 * /api/requests/{requestId}/reject:
 *   patch:
 *     tags:
 *       - Request
 *     name: Request
 *     summary: A manager should be able to reject requests of his direct report
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
 *         schema:
 *           $ref: '#/definitions/Request'
 *           type: object
 *     responses:
 *       '200':
 *         description: Request rejected successfully
 *       '400':
 *         description: invalid parameters.
 *       '401':
 *         description: No valid token supplied
 *       '403':
 *         description: Unauthorized
 *       '422':
 *         description: Rejecting rejected request
 */
