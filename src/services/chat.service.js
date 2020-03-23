import { Op } from 'sequelize';
import models from '../models';
// eslint-disable-next-line import/no-cycle
import { users } from '../helpers/eventEmmiters/socket';

const { Chat, Users } = models;

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
   * @param {object} param param
   * @param {object} unreadCounter unreadCounter
   * @returns {object} messages.
   */
  static async getMessages(param, unreadCounter) {
    const results = await Chat.findAll({
      where: param,
      order: [['isRead', 'ASC'], ['createdAt', 'ASC']]
    });

    const unread = await Chat.count({
      where: {
        ...unreadCounter,
        isRead: false
      }
    });
    return {
      unread,
      messages: results
    };
  }

  /**
   * @param {object} newMessage
   * @return {function} send messages to connected client
   */
  static async sendMessage(newMessage) {
    if (!users[newMessage.receiver]) return 0;
    users[newMessage.receiver].emit('newMessage', newMessage);
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

  /**
   *
   *
   * @static
   * @param {*} email
   * @return {object} updated message
   * @memberof ChatService
   */
  static async updateLastActivity(email) {
    return Users.update({ lastActivity: new Date() }, {
      where: { email },
      returning: true
    });
  }
}
