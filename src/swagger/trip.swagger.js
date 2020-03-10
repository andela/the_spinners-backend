/**
 * @swagger
 * definitions:
 *   OneWayTrip:
 *     type: object
 *     properties:
 *       originId:
 *         type: integer
 *       destinationId:
 *         type: integer
 *       departureDate:
 *         type: string
 *       travelReasons:
 *         type: string
 *       accommodationId:
 *         type: integer
 *     required:
 *         - originId
 *         - destinationId
 *         - departureDate
 *         - travelReasons
 *         - accommodationId
 */

/**
 * @swagger
 * /api/trips/one-way:
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
 *           $ref: '#/definitions/OneWayTrip'
 *           type: object
 *           originId:
 *              type: integer
 *           destinationId:
 *              type: integer
 *           departureDate:
 *              type: string
 *           travelReasons:
 *              type: string
 *           accommodationId:
 *              type: integer
 *         required:
 *              - originId
 *              - destinationId
 *              - departureDate
 *              - travelReasons
 *              - accommodationId
 *     responses:
 *       '201':
 *         description: Trip created successfully
 *       '400':
 *         description: Invalid inputs.
 *       '401':
 *         description: No valid token provided
 *       '409':
 *         description: Trip already created
 */

/**
 * @swagger
 * definitions:
 *   returnTrip:
 *     type: object
 *     properties:
 *       originId:
 *         type: integer
 *       destinationId:
 *         type: integer
 *       departureDate:
 *         type: string
 *       returnDate:
 *         type: string
 *       travelReasons:
 *         type: string
 *       accommodationId:
 *         type: integer
 *       required:
 *         - originId
 *         - destinationId
 *         - departureDate
 *         - returnDate
 *         - travelReasons
 *         - accommodationId
 */

/**
 * @swagger
 * /api/trips/return:
 *   post:
 *     tags:
 *       - trips
 *     name: Return Trip
 *     summary: User should be able to request a trip that has return date
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
 *         description: originId is required,
 *                      originId is not allowed to be empty,
 *                      originId must be at least 2 characters long,
 *                      Invalid, numbers are not allowed in originId field,
 *                      DestinationId is required,
 *                      DestinationId is not allowed to be empty,
 *                      DestinationId must be at least 2 characters long,
 *                      Invalid, numbers are not allowed in destinationId field,
 *                      Date should be greater than today\'s date,
 *                      Date must be in YYYY-MM-DD format,
 *                      Travel date is required,
 *                      Return date is required,
 *                      Travel reasons is required,
 *                      Travel reasons is not allowed to be empty,
 *                      Travel reasons must be at least 5 characters long,
 *                      AccommodationId is required,
 *                      AccommodationId is not allowed to be empty,
 *                      AccommodationId must be at least 5 characters long,
 *                      Invalid, numbers are not allowed in accommodationId field
 */

/**
 * @swagger
 * definitions:
 *   requests:
 *     type: object
 *
 */

/**
 * @swagger
 * /api/trips/requests:
 *   get:
 *     tags:
 *       - trips
 *     name: Requests Trip List
 *     summary: User should be able to view his requested trip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *       - name: page
 *         in: query
 *         type: integer
 *       - name: limit
 *         in: query
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/requests'
 *           type: object
 *     responses:
 *       '200':
 *         description: List of requested trips
 *       '401':
 *         description: Anauthorized, the ID does not match the signed in user ID
 *       '400':
 *         description: Page must be greater than 0,
 *                      Limit must be a number,
 *                      Page must be a number,
 *                      Page is required,
 *                      Limit is required
 *       '404':
 *         description: User ID does not exists, You didn\'t create a trip, please create one
 *
 */
/**
 * @swagger
 * definitions:
 *   MultiCityTrip:
 *     type: array
 *     collectionFormat: multi
 *     minItems: 2
 *     items:
 *        type: object
 *        properties:
 *            originId:
 *              type: integer
 *            destinationId:
 *              type: integer
 *            departureDate:
 *              type: string
 *            travelReasons:
 *              type: string
 *            accommodationId:
 *              type: integer
 *        required:
 *             - originId
 *             - destinationId
 *             - departureDate
 *             - travelReasons
 *             - accommodationId
 */

/**
 * @swagger
 * /api/trips/multi-city:
 *   post:
 *     tags:
 *       - trips
 *     name: Multi city trip
 *     summary: A user should be able to request multi city trip
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
 *            type: array
 *            $ref: '#/definitions/MultiCityTrip'
 *            items:
 *              type: object
    *              originId:
    *               type: integer
    *              destinationId:
    *               type: array
    *              departureDate:
    *               type: string
    *              travelReasons:
    *               type: string
    *              accommodationId:
    *               type: integer
    *         minItems: 2
 *         required:
 *              - originId
 *              - destinationId
 *              - departureDate
 *              - travelReasons
 *              - accommodationId
 *     responses:
 *       '201':
 *         description: Trip created successfully
 *       '400':
 *         description: Invalid inputs.
 *       '401':
 *         description: No valid token provided
 *       '409':
 *         description: Trip already created
 */

/**
 * @swagger
 * definitions:
 *   Locations:
 *     type: object
 *
 */


/**
 * @swagger
 * /api/trips/locations:
 *   get:
 *     tags:
 *       - locations
 *     name: Locations
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
 *         description: List of available locations
 *       '401':
 *         description: No valid token supplied
 *
 */

/**
 * @swagger
 * definitions:
 *   comments:
 *     type: object
 *     properties:
 *       comment:
 *         type: string
 *       required:
 *         - comment
 */


/**
 * @swagger
 * /api/trips/requests/{tripId}/comments:
 *   post:
 *     tags:
 *       - trips
 *     name: Comment on requests trips
 *     summary: User should be able to comment on requested trip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *       - name: tripId
 *         in: path
 *       - name: comment
 *         in: body
 *         schema:
 *           $ref: '#/definitions/comments'
 *           type: object
 *     responses:
 *       '201':
 *         description: Your comment was submitted successfully
 *       '401':
 *         description: You are not authorized to perform this activity
 *       '404':
 *         description: Trip ID doesn't exists
 *
 */

/**
 * @swagger
 * definitions:
 *   deleteComment:
 *     type: object
 *     properties:
 *       subjectType:
 *         type: string
 *       required:
 *         - subjectType
 */


/**
 * @swagger
 * /api/trips/{tripId}/comments/{commentId}:
 *   delete:
 *     tags:
 *       - trips
 *     name: Delete comment
 *     summary: User should be able to delete comment posted on thread
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *       - name: tripId
 *         required: true
 *         in: path
 *       - name: commentId
 *         required: true
 *         in: path
 *       - name: subjectType
 *         in: body
 *         schema:
 *           $ref: '#/definitions/deleteComment'
 *           type: object
 *     responses:
 *       '200':
 *         description: Comment was deleted
 *       '401':
 *         description: You are not authorized to perform this activity,
 *                      The comment you want to delete doesn't belong to the trip
 *       '404':
 *         description: Trip ID doesn't exists, Comment ID doesn't exists
 *
 */

/**
 * @swagger
 * /api/trips/request/{tripId}/comments:
 *   get:
 *     tags:
 *       - trips
 *     name: View all comments
 *     summary: User should be able to view his comments posted on requested trip
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         type: string
 *       - in: path
 *         name: tripId
 *       - name: page
 *         in: query
 *         type: integer
 *       - name: limit
 *         in: query
 *         type: integer
 *         schema:
 *           $ref: '#/definitions/viewComments'
 *           type: object
 *     responses:
 *       '200':
 *         description: List all comments
 *       '400':
 *         description: Page must be greater than 0,
 *                      Limit must be a number,
 *                      Page must be a number,
 *                      Page is required,
 *                      Limit is required
 *       '404':
 *         description: Not comments found for you
 *
 */
