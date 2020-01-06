import express from 'express';
import authMiddleware from '../middlewares/auth.middleware';
import { checkIfOptionExists, checkIfUserHasUnread, checkIfIdExist } from '../middlewares/notification.middleware';
import NotificationController from '../controllers/notification.controller';
import { validateNotification, validateIdInParams } from '../validations/notification.validation';

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
router.patch( // mark all nbotification as read
  '/mark-all-as-read',
  authMiddleware.checkUserLoggedIn,
  checkIfUserHasUnread,
  NotificationController.markAllAsRead
);
router.patch( // mark one notification as read
  '/mark-as-read/:id',
  validateIdInParams,
  authMiddleware.checkUserLoggedIn,
  checkIfIdExist,
  NotificationController.markOneAsRead
);
export default router;
