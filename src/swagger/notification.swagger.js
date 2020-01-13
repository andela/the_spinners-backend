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

/**
 * @swagger
 * /api/notifications/mark-all-as-read:
 *   patch:
 *     tags:
 *       - Notification
 *     name: Mark all notifications as read
 *     summary: Mark all notifications as read
 *     parameters:
 *       - name: authorization
 *         in: header
 *         schema:
 *           type: string
 *         required: true
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

/**
 * @swagger
 * /api/notifications/mark-as-read/{id}:
 *   patch:
 *     tags:
 *       - Notification
 *     name: Mark notification as read by ID
 *     summary: Mark one notifications as read
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         schema:
 *           type: string
 *         required: true
 *       - name: id
 *         in: path
 *         schema:
 *           type: integer
 *         required: true
 *         minimum: 1
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
