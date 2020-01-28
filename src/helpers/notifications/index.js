import NotificationService from '../../services/notification.service';

const NotificationListeners = () => {
  NotificationService.sendTripNotification();
  NotificationService.requestUpdateNotification();
  NotificationService.sendCommentNotification();
};

export default NotificationListeners;
