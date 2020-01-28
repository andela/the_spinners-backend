import models from '../models';
import { users } from '../helpers/eventEmmiters/socket';
import emitter from '../helpers/eventEmmiters/emitter';
import UserService from './user.service';
import PreferenceService from './preference.service';
import newCommentEmailBody from '../helpers/mails/comment-notification.email';
import tripEmailBody from '../helpers/mails/trip-notification.email';
import requestActionEmailTemplate from '../helpers/mails/request-action.email';
import SendEmailService from './send-email.service';

const { Notifications } = models;

/**
 * @class NotificationService
 */
export default class NotificationService {
  /**
   * @static
   * @param {*} notification
   * @memberof NotificationService
   * @return {notification} new notification
   */
  static async createNotification(notification) {
    return Notifications.create(notification);
  }

  /**
   * Creates a new notification.
   * @param {object} param notification
   * @returns {object} The notification object.
   */
  static async getAllNotifications(param) {
    const results = await Notifications.findAll({
      where: param,
      order: [['isRead', 'ASC'], ['createdAt', 'DESC']]
    });

    const unread = await Notifications.count({
      where: {
        ...param,
        isRead: false
      }
    });
    return {
      unread,
      notifications: results
    };
  }

  /**
   * @param {object} receiver
   * @param {object} notification
   * @return {function} send notification to connected client
   */
  static async sendInAppNotifications(receiver, notification) {
    // Ensure notification is an object which contain message
    if (!users[receiver]) return 0;
    users[receiver].emit('new-notification', notification);
  }

  /** find notification
   * @static
   * @param {object} property
   * @memberof UserService
   * @returns {object} data
   */
  static findNotificationByProperty(property) {
    return Notifications.findOne({
      where: property
    });
  }

  /**
   * Mark as read notifications
   * @param {object} userInfo notification
   * @param {object} user notification
   * @returns {object} The notification object.
   */
  static updateNotification(userInfo, user) {
    return Notifications.update(userInfo, {
      where: user
    });
  }

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
    const lineManagerData = await UserService.findUserByProperty({ id: lineManagerId });
    const managerPreferences = { isInAppNotification, isEmailNotification };
    return {
      id: lineManagerId,
      managerPreferences,
      managerEmail: lineManagerData.email,
      managerNames: `${lineManagerData.firstName} ${lineManagerData.lastName}`
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

      const data = await this.createNotification({
        requestId: request.id,
        message,
        type: 'new_request',
        userId: id,
      });
      const { isRead, updateAt, createdAt, ...notificationData } = data.dataValues;

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
    await emitter.on('request-updated', async (request) => {
      const { firstName, lastName, email, id } = await UserService.findUserByProperty({
        id: request.requesterId
      });

      const { isInAppNotification, isEmailNotification } = await PreferenceService
        .findPreference({ userId: id });
      const userPreferences = { isInAppNotification, isEmailNotification };
      const userNames = `${firstName} ${lastName}`;

      const message = `Your request have been ${request.status} by your manager`;

      const notificationData = await this.createNotification({
        requestId: request.id,
        message,
        type: 'request_status',
        userId: id,
      });

      const unsubscribeUrl = `https://${process.env.BASE_URL}/api/notifications`;
      const msg = requestActionEmailTemplate(userNames, message, unsubscribeUrl, request);
      const emailSubject = `New travel request by ${firstName} ${lastName}`;

      this.sendNotifications(email, userPreferences, msg, emailSubject, notificationData);
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
      NotificationService.sendInAppNotifications(email, notificationData);
    }
  }

  /**
   *
   * @static
   * @param {*} request
   * @returns {*} This function create and send a notification to a user
   * @memberof TripNotification
   */
  static async sendCommentNotification() {
    await emitter.on('comment-created', async (userToNotify, commentPayload) => {
      const { firstName, lastName, email, id } = await UserService.findUserByProperty({
        id: userToNotify
      });

      const { isInAppNotification, isEmailNotification } = await PreferenceService
        .findPreference({ userId: userToNotify });
      const userPreferences = { isInAppNotification, isEmailNotification };
      const userNames = `${firstName} ${lastName}`;

      const message = 'A new comment have been posted';

      const notificationData = await this.createNotification({
        requestId: commentPayload.id,
        message,
        type: 'new_comment',
        userId: id,
      });

      const unsubscribeUrl = `https://${process.env.BASE_URL}/api/notifications`;
      const commentLink = 'http://localhost:3000/api/trips/request/comments';
      const msg = newCommentEmailBody(
        userNames,
        message,
        unsubscribeUrl,
        commentLink,
        commentPayload
      );
      const emailSubject = 'You have a new comment';

      this.sendNotifications(email, userPreferences, msg, emailSubject, notificationData);
    });
  }
}
