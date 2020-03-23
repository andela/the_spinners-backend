import { Op } from 'sequelize';
import { users } from '../helpers/eventEmmiters/socket';
import ResponseService from '../services/response.service';
import ChatService from '../services/chat.service';
import UserService from '../services/user.service';

/** Class representing comments controller. */
class ChatController {
  /**
   * Save a new message.
   * @param {object} req request
   * @param {object} res response
   * @returns {object} response object
   */
  static async saveMessage(req, res) {
    const newMessage = await ChatService.saveMessage({ ...req.body, sender: req.userData.email });
    ChatService.sendMessage(newMessage.get());

    ResponseService.setSuccess(200, 'message added successfully', newMessage);
    ResponseService.send(res);
  }

  /**
   *
   * @static
   * @param {*} req request
   * @param {*} res response
   * @memberof ChatController
   * @returns {object} response object
   */
  static async markAllAsRead(req, res) {
    const messages = await ChatService.markAllAsRead(req.userData.email, req.query.chatUser);

    ResponseService.setSuccess(200, 'message marked as read succesfully', messages);
    ResponseService.send(res);
  }

  /**
   * gets all messages for a user
   * @param {object} req request
   * @param {object} res response
   * @returns {object} response
   */
  static async getMessages(req, res) {
    const { chatUser } = req.query;
    const message = await ChatService.getMessages({
      [Op.or]: [{ receiver: req.userData.email, sender: chatUser },
        { sender: req.userData.email, receiver: chatUser }]
    }, { receiver: req.userData.email, sender: chatUser });

    ResponseService.setSuccess(200, 'messages fetched successfully', message);
    ResponseService.send(res);
  }

  /**
   * gets all messages for a user
   * @param {object} req request
   * @param {object} res response
   * @returns {object} response
   */
  static async getAllUsers(req, res) {
    const allUsers = await UserService.getAllUsers();


    const chatUsers = allUsers.map((user) => {
      const chatUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        lastActivity: user.lastActivity
      };

      const onlineUser = users[user.email];

      if (onlineUser) {
        chatUser.isOnline = true;
        return chatUser;
      }
      chatUser.isOnline = false;
      return chatUser;
    });

    const sortedUsers = chatUsers.sort((a, b) => a.isOnline.toString()
      .localeCompare(b.isOnline.toString())).reverse();
    ResponseService.setSuccess(200, 'All users', sortedUsers);
    return ResponseService.send(res);
  }
}

export default ChatController;
