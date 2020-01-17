/**
 * @swagger
 * /api/search?:
 *   get:
 *     tags:
 *       - Search
 *     name: Search the requests
 *     parameters:
 *       - in: header
 *         name: authorization
 *         required: true
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: departureDate
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Search results
 *       '404':
 *         description: Results not found
 *
 */
