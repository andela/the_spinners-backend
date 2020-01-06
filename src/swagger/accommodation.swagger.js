/**
 * @swagger
 * definitions:
 *   AccommodationType:
 *     type: object
 *
 */


/**
 * @swagger
 * /api/accommodation-type:
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
 * /api/book-accommodation:
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
 *              - typeId
 *              - from
 *              - to
 *     responses:
 *       '201':
 *         description: accommodation created successfully
 *       '400':
 *         description: invalid inputs.
 *       '401':
 *         description: No valid token supplied
 */
