import PreferenceService from '../services/preference.service';
import ResponseService from '../services/response.service';
import NotificationService from '../services/notification.service';

export const checkIfOptionExists = async (req, res, next) => {
  const prefs = await PreferenceService.findPreference({ userId: req.userData.id });
  const { dataValues } = prefs;

  if (req.body.isInAppNotification
    && req.body.isInAppNotification.toString() === dataValues.isInAppNotification.toString()) {
    ResponseService.setSuccess(200, 'This option has been already set for this notification mode');
    return ResponseService.send(res);
  }
  if (req.body.isEmailNotification
    && req.body.isEmailNotification.toString() === dataValues.isEmailNotification.toString()) {
    ResponseService.setSuccess(200, 'This option has been already set for this notification mode');
    return ResponseService.send(res);
  }
  next();
};
export const checkIfUserHasUnread = async (req, res, next) => {
  const data = await NotificationService
    .getAllNotifications({ userId: req.userData.id, isRead: false });
  if (data.unread === 0) {
    ResponseService.setError(422, 'You don\'t have unread notifications');
    return ResponseService.send(res);
  }
  next();
};

export const checkIfIdExist = async (req, res, next) => {
  const notification = await NotificationService
    .findNotificationByProperty(req.params);
  if (!notification) {
    ResponseService.setError(404, 'Notification ID does not exists');
    return ResponseService.send(res);
  }
  const { isRead, userId } = notification;
  if (isRead === true) {
    ResponseService.setError(422, 'This Notification is already read.');
    return ResponseService.send(res);
  }
  if (userId !== req.userData.id) {
    ResponseService.setError(422, 'You can\'t modify notification which does\'t belong to you');
    return ResponseService.send(res);
  }
  next();
};
