import TripNotification from '../../services/trip-notification.service';

const NotificationListeners = () => {
  TripNotification.sendTripNotification();
  TripNotification.requestUpdateNotification();
};

export default NotificationListeners;
