import TripNotification from '../../services/trip-notification.service';

const NotificationListeners = () => {
  TripNotification.sendTripNotification();
};

export default NotificationListeners;
