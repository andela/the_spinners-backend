/**
 * @swagger
 * /api/notifications:
 *   put:
 *     tags:
 *       - Notification
 *     name: Notification
 *     summary: Subscribe to certain notification mode(email / in-app)
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         description: Authorization token
 *         required: true
 *         schema:
 *           type: string
 *       - name: option
 *         in: body
 *         description: Preferred mode of notification
 *         required: true
 *         schema:
 *           properties:
 *             value:
 *               type: string
 *     responses:
 *       '200':
 *         description: You are now unsubscribed to receive :option.
 *       '422':
 *         description: You have already subscribed for this notification mode
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     tags:
 *       - Notification
 *     name: Get all notification for a signed in User
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
 *         description: Your Notifications have been retrieved successfully
 *       '401':
 *         description: No Token supplied
 *
 */
