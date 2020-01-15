/**
 * @swagger
 * /api/search?term={query}&page={page}&limit={limit}:
 *   get:
 *     tags:
 *       - Search
 *     name: Search the requests
 *     parameters:
 *       - name: authorization
 *         in: header
 *         required: true
 *       - in: path
 *         name: query
 *         required: true
 *       - in: path
 *         name: page
 *         required: true
 *       - in: path
 *         name: limit
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       '200':
 *         description: search results
 *
 */
