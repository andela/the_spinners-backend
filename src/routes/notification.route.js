import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import checkIfOptionExists from '../middlewares/notification.middleware';
import NotificationController from '../controllers/notification.controller';
import validateNotification from '../validations/notification.validation';

const router = express.Router();

router.put(
  '/', // Route to set preferred mode for notification
  validateNotification,
  authMiddleware.checkUserLoggedIn,
  checkIfOptionExists,
  NotificationController.setNotificationMode
);
router.get(
  '/', // Route to get notification by a User
  authMiddleware.checkUserLoggedIn,
  NotificationController.getAllNotifications
);
export default router;
