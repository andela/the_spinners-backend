import emitter from '../helpers/eventEmmiters/emitter';
import NotificationService from './notification.service';
import UserService from './user.service';
import tripEmailBody from '../helpers/mails/trip-notification.email';
import SendEmailService from './send-email.service';
import PreferenceService from './preference.service';

/** Class representing a Notifications . */
class TripNotification {
  /**
   * @param {object} request
   * @return {function} create notifications
   */
  static async findManagerToNotify(request) {
    const { lineManagerId } = await UserService.findUserByProperty({
      id: request.userId
    });

    const { isInAppNotification, isEmailNotification } = await PreferenceService
      .findPreference({ userId: lineManagerId });
    const manager = await UserService.findUserByProperty({ id: lineManagerId });
    const managerPreferences = { isInAppNotification, isEmailNotification };
    return {
      id: lineManagerId,
      managerPreferences,
      managerEmail: manager.email,
      managerNames: `${manager.firstName} ${manager.lastName}`
    };
  }

  /**
   * @return {function} create notifications
   */
  static async sendTripNotification() {
    await emitter.on('request-created', async (request) => {
      const {
        id,
        managerEmail,
        managerPreferences,
        managerNames
      } = await this.findManagerToNotify(request);
      // Find requestor Names
      const { firstName, lastName } = await UserService
        .findUserByProperty({ id: request.userId });
      const message = `New ${request.tripType} trip have been Requested by ${firstName} ${lastName}`;

      const data = await NotificationService.createNotification({
        requestId: request.id,
        message,
        type: 'new_request',
        userId: id,
      });
      const { isRead, updateAt, createdAt, ...notificationData } = data.dataValues;

      // email nofitication
      if (managerPreferences.isEmailNotification === true) {
        const unsubscribeUrl = `https://${process.env.BASE_URL}/api/notifications`;
        const msg = tripEmailBody(managerNames, message, unsubscribeUrl, request);
        const emailSubject = `New travel request by ${firstName} ${lastName}`;
        SendEmailService.sendGridEmail(managerEmail, emailSubject, msg);
      }
      // in app notification
      if (managerPreferences.isInAppNotification === true) {
        NotificationService.sendNotifications(managerEmail, notificationData);
      }
    });
  }
}

export default TripNotification;
