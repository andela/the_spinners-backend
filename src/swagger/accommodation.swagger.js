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

/**
 * @swagger
 *  definitions:
 *    createAccommodation:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *        typeId:
 *          type: integer
 *        locationId:
 *          type: integer
 *        description:
 *          type: string
 *        accommodationPictures:
 *          type: array
 *          items:
 *             type: object
 *             properties:
 *                imageUrl:
 *                    type: string
 *                subjectType:
 *                    type: string
 *        addOnServices:
 *          type: array
 *          items:
 *             type: object
 *             properties:
 *                serviceName:
 *                    type: string
 *                price:
 *                    type: number
 *                description:
 *                    type: string
 *        amenities:
 *          type: array
 *          items:
 *             type: object
 *             properties:
 *                amenity:
 *                    type: string
 *        rooms:
 *          type: array
 *          items:
 *             type: object
 *             properties:
 *                roomType:
 *                    type: string
 *                numberOfPeople:
 *                    type: integer
 *                roomPrice:
 *                    type: number
 *                roomPictures:
 *                    type: array
 *                    items:
 *                        type: object
 *                        properties:
 *                          imageUrl:
 *                              type: string
 *                          subjectType:
 *                              type: string
 *                numberOfRooms:
 *                    type: integer
 *      required:
 *          - name
 *          - typeId
 *          - locationId
 *          - roomList
 * */

/**
 * @swagger
 * /api/accommodations:
 *   post:
 *     tags:
 *       - accommodation
 *     name: Accommodation
 *     summary: Travel admin/Supplier should be able to create an accommodation on his trip
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
 *           $ref: '#/definitions/createAccommodation'
 *     responses:
 *       '201':
 *         description: accommodation booked successfully
 *       '400':
 *         description: invalid inputs.
 *       '401':
 *         description: No valid token supplied
 */

/**
* @swagger
* definitions:
*   React On Booked Accommodation:
*     type: object
*     properties:
*       like:
*         type: string
*       unlike:
*         type: string
*     required:
*         - like
*         - unlike
*/
/**
 * @swagger
 * /api/accommodations/{accommodationId}/rooms/{roomId}/react:
 *   patch:
 *     tags:
 *       - accommodation
 *     name: Accommodation Likes
 *     summary: A user should be able to like or unlike on a booked accommodation facility
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
*       - name: roomId
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/definitions/React On Booked Accommodation'
 *           type: object
 *           like:
 *              type: string
 *           unlike:
 *              type: string
 *         required:
 *              - like
 *              - unlike
 *     responses:
 *       '200':
 *         description: Reaction updated successfully
 *       '400':
 *         description: Invalid inputs
 *       '401':
 *         description: No Token supplied
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Accommodation booking not found
 */

/**
 * @swagger
 * /api/accommodations/{accommodationId}/rooms/{roomId}/reactions-count:
 *   get:
 *     tags:
 *       - accommodation
 *     name: Accommodation Reactions Count
 *     summary: A user should be able get count of both likes and dislikes on specific accommodation
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
*       - name: roomId
 *         in: path
 *     responses:
 *       '200':
 *         description: Reaction records successfully retrieved
 *       '400':
 *         description: Invalid inputs
 *       '401':
 *         description: No Token supplied
 *       '403':
 *         description: Forbidden
 *       '404':
 *         description: Accommodation booking not found
 */
