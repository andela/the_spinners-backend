/**
 * @swagger
 * definitions:
 *   Trip:
 *     type: object
 *     properties:
 *       departure:
 *         type: string
 *       destination:
 *         type: string
 *       travelDate:
 *         type: string
 *       travelReasons:
 *         type: string
 *       accommodation:
 *         type: string
 *     required:
 *         - departure
 *         - destination
 *         - travelDate
 *         - travelReasons
 *         - accommodation
 */

/**
 * @swagger
 * /api/one-way-trips:
 *   post:
 *     tags:
 *       - trips
 *     name: One way trip
 *     summary: A user should be able to request one way trip
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
 *           $ref: '#/definitions/Trip'
 *           type: object
 *           departure:
 *              type: string
 *           destination:
 *              type: string
 *           travelDate:
 *              type: string
 *           travelReasons:
 *              type: string
 *           accommodation:
 *              type: string
 *         required:
 *              - departure
 *              - destination
 *              - travelDate
 *              - travelReasons
 *              - accommodation
 *     responses:
 *       '201':
 *         description: Trip created successfully
 *       '400':
 *         description: invalid inputs.
 *       '401':
 *         description: No Token supplied
 */
