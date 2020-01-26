import { Op } from 'sequelize';
import models from '../models';
import { users } from '../helpers/eventEmmiters/socket';

const { Chat } = models;

/**
 * @class ChatService
 */
export default class ChatService {
  /**
   * @static
   * @param {*} message
   * @memberof ChatService
   * @return {message} new message
   */
  static async saveMessage(message) {
    return Chat.create(message);
  }

  /**
   * Get messages.
   * @param {object} param notification
   * @returns {object} The notification object.
   */
  static async getMessages(param) {
    const results = await Chat.findAll({
      where: param,
      order: [['isRead', 'ASC'], ['createdAt', 'ASC']]
    });

    const unread = await Chat.count({
      where: {
        ...param,
        isRead: false
      }
    });
    return {
      unread,
      messages: results
    };
  }

  /**
   * @param {object} receiver
   * @param {object} sender
   * @param {object} message
   * @return {function} send messages to connected client
   */
  static async sendMessage(receiver, sender, message) {
    if (!users[receiver]) return 0;
    users[receiver].emit('private message', { sender, message });
  }

  /**
   *
   *
   * @static
   * @param {*} receiver
   * @param {*} sender
   * @return {object} updated message
   * @memberof ChatService
   */
  static async markAllAsRead(receiver, sender) {
    return Chat.update({ isRead: true }, {
      where: { [Op.and]: [{ sender }, { receiver }] },
      // where: { sender: senderId },
      returning: true
    });
  }
}
