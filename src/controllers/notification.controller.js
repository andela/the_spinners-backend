import ResponseService from '../services/response.service';
import PreferenceService from '../services/preference.service';
import NotificationService from '../services/notification.service';

/**
 * @class NotificationController
 * @description Handles notifications.
 * */
class NotificationController {
  /**
   * @param  {object} req - Request object
   *  @param {object} res - Response object
   *  @returns {object} response
   * */
  static async setNotificationMode(req, res) {
    if (req.body.isInAppNotification) { // If request is isInAppNotification
      await PreferenceService
        .updatePreference(
          { userId: req.userData.id },
          { isInAppNotification: req.body.isInAppNotification }
        );
      ResponseService.setSuccess(200, 'Successfully updated your in-app notification preferences.');
      return ResponseService.send(res);
    }
    // If request is isEmailNotification
    await PreferenceService
      .updatePreference(
        { userId: req.userData.id },
        { isEmailNotification: req.body.isEmailNotification }
      );
    ResponseService.setSuccess(200, 'Successfully updated your email notification preferences.');
    return ResponseService.send(res);
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @return {function} requests
   */
  static async getAllNotifications(req, res) {
    const data = await NotificationService.getAllNotifications({ userId: req.userData.id });
    ResponseService.setSuccess(200, 'Your Notifications have been retrieved successfully', data);
    return ResponseService.send(res);
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @return {function} requests
   */
  static async markAllAsRead(req, res) {
    await NotificationService.updateNotification(
      { isRead: true },
      { userId: req.userData.id }
    );
    ResponseService.setSuccess(200, 'Notifications successfully marked as read');
    return ResponseService.send(res);
  }

  /**
   * @param {object} req request
   * @param {object} res response
   * @return {function} requests
   */
  static async markOneAsRead(req, res) {
    await NotificationService.updateNotification(
      { isRead: true },
      { id: req.params.id, userId: req.userData.id }
    );
    ResponseService.setSuccess(200, 'Notification successfully marked as read');
    return ResponseService.send(res);
  }
}
export default NotificationController;
