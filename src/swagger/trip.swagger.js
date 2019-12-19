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

/**
 * @swagger
 * definitions:
 *   returnTrip:
 *     type: object
 *     properties:
 *       departure:
 *         type: string
 *       destination:
 *         type: string
 *       travelDate:
 *         type: string
 *       returnDate:
 *         type: string
 *       travelReasons:
 *         type: string
 *       accommodation:
 *         type: string
 *       required:
 *         - departure
 *         - destination
 *         - travelDate
 *         - returnDate
 *         - travelReasons
 *         - accommodation
 */

/**
 * @swagger
 * /api/return-trip:
 *   post:
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
 *           $ref: '#/definitions/returnTrip'
 *           type: object
 *     responses:
 *       '201':
 *         description: Trip created successfully
 *       '401':
 *         description: Unauthorized access. Invalid token,
 *                      Unauthorized access. Invalid token for this user,
 *                      No Token supplied
 *       '400':
 *         description: Departure is required,
 *                      Departure is not allowed to be empty,
 *                      Departure must be at least 2 characters long,
 *                      Invalid, numbers are not allowed in departure field,
 *                      Destination is required,
 *                      Destination is not allowed to be empty,
 *                      Destination must be at least 2 characters long,
 *                      Invalid, numbers are not allowed in destination field,
 *                      Date should be greater than today\'s date,
 *                      Date must be in YYYY-MM-DD format,
 *                      Travel date is required,
 *                      Return date is required,
 *                      Travel reasons is required,
 *                      Travel reasons is not allowed to be empty,
 *                      Travel reasons must be at least 5 characters long,
 *                      Accommodation is required,
 *                      Accommodation is not allowed to be empty,
 *                      Accommodation must be at least 5 characters long,
 *                      Invalid, numbers are not allowed in accommodation field
 */
