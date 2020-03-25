import emitter from '../helpers/eventEmmiters/emitter';
import NotificationService from './notification.service';
import UserService from './user.service';
import { tripEmailBody, tripUpdateTemplate } from '../helpers/mails/trip-notification.email';
import requestActionEmailTemplate from '../helpers/mails/request-action.email';
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

      const notificationData = await NotificationService.createNotification({
        requestId: request.id,
        message,
        type: 'new_request',
        userId: id,
      });

      const unsubscribeUrl = `https://${process.env.BASE_URL}/api/notifications`;
      const msg = tripEmailBody(managerNames, message, unsubscribeUrl, request);
      const emailSubject = `New travel request by ${firstName} ${lastName}`;
      this.sendNotifications(managerEmail, managerPreferences, msg, emailSubject, notificationData);
    });
  }

  /**
   *
   * @static
   * @param {*} request
   * @returns {*} notifications
   * @memberof TripNotification
   */
  static async requestUpdateNotification() {
    await emitter.on('request-status-updated', async (request) => {
      const { firstName, lastName, email, id } = await UserService.findUserByProperty({
        id: request.requesterId
      });

      const { isInAppNotification, isEmailNotification } = await PreferenceService
        .findPreference({ userId: id });
      const userPreferences = { isInAppNotification, isEmailNotification };
      const userNames = `${firstName} ${lastName}`;

      const message = `Your request have been ${request.status} by your manager`;

      const notificationData = await NotificationService.createNotification({
        requestId: request.id,
        message,
        type: 'request_status',
        userId: id,
      });

      const unsubscribeUrl = `https://${process.env.BASE_URL}/api/notifications`;
      const msg = requestActionEmailTemplate(userNames, message, unsubscribeUrl, request);
      const emailSubject = message;

      this.sendNotifications(email, userPreferences, msg, emailSubject, notificationData);
    });
    await emitter.on('request-updated', async (request) => {
      const {
        id,
        managerEmail,
        managerPreferences,
        managerNames
      } = await this.findManagerToNotify(request);

      // Find requestor Names
      const { firstName, lastName } = await UserService
        .findUserByProperty({ id: request.userId });
      const message = `Trip by ${firstName} ${lastName} have been edited`;

      const notificationData = await NotificationService.createNotification({
        requestId: request.id,
        message,
        type: 'request_update',
        userId: id,
      });

      const unsubscribeUrl = `https://${process.env.BASE_URL}/api/notifications`;
      const msg = tripUpdateTemplate(managerNames, message, unsubscribeUrl);
      const emailSubject = message;
      this.sendNotifications(managerEmail, managerPreferences, msg, emailSubject, notificationData);
    });
  }

  /**
   *
   *
   * @static
   * @param {*} email email to send to
   * @param {*} userPreferences User notification preferences
   * @param {*} msg Messagew for email
   * @param {*} emailSubject Email subject
   * @param {*} notificationData
   * @returns {*} Notifications
   * @memberof TripNotification
   */
  static async sendNotifications(email, userPreferences, msg, emailSubject, notificationData) {
    // email nofitication
    if (userPreferences.isEmailNotification === true) {
      SendEmailService.sendGridEmail(email, emailSubject, msg);
    }
    // in app notification
    if (userPreferences.isInAppNotification === true) {
      NotificationService.sendNotifications(email, notificationData);
    }
  }
}

export default TripNotification;
