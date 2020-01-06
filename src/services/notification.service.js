import models from '../models';
import { users } from '../helpers/eventEmmiters/socket';

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
  static async sendNotifications(receiver, notification) {
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
}
