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
