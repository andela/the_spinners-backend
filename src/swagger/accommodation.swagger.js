/**
 * @swagger
 * definitions:
 *   AccommodationType:
 *     type: object
 *
 */


/**
 * @swagger
 * /api/accommodations:
 *   get:
 *     tags:
 *       - accommodation
 *     name: Accommodation types
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
 *         description: List of available accommodationTypes
 *       '401':
 *         description: No valid token supplied
 *
 */

/**
* @swagger
* definitions:
*   Accommodation:
*     type: object
*     properties:
*       from:
*         type: string
*       to:
*         type: string
*     required:
*         - from
*         - to
*/

/**
 * @swagger
 * /api/accommodations/{accommodationId}/book:
 *   post:
 *     tags:
 *       - accommodation
 *     name: Accommodation
 *     summary: A user should be able to book an accommodation on his trip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *              type: string
 *       - name: accommodationId
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/Accommodation'
 *           type: object
 *           typeId:
 *              type: integer
 *           from:
 *              type: string
 *           to:
 *              type: string
 *         required:
 *              - from
 *              - to
 *     responses:
 *       '201':
 *         description: accommodation booked successfully
 *       '400':
 *         description: invalid inputs.
 *       '401':
 *         description: No valid token supplied
 */
