// eslint-disable-next-line import/no-cycle
import ChatService from '../../services/chat.service';

const io = require('socket.io')();

const socketioJwt = require('socketio-jwt');

const users = {};
const startSocket = (server) => {
  io.attach(server);
  let userName;
  let disconnect;
  io.sockets
    .on('connection', socketioJwt.authorize({ // Verify authorization for token
      secret: process.env.SECRET_KEY,
      timeout: 15000 // 15 seconds to send the authentication message
    }))
    .on('authenticated', (socket) => {
      socket.emit('success', socket.decoded_token); // Emit success message for front-end
      socket.on('new-user', (user) => { // save a new user for future needs
        if (users[user.email]) {
          disconnect = false;
        }
        userName = user.email;
        users[user.email] = socket;
        socket.broadcast.emit('user-connected', user);
      });
      socket.on('new-message', async (message) => {
        const response = await ChatService.saveMessage(message);
        const newMessage = response.get();
        if (users[newMessage.sender]) {
          users[newMessage.sender].emit('sent', newMessage);
        }
        if (!users[newMessage.receiver]) return 0;
        users[newMessage.receiver].emit('newMessage', newMessage);
      });
      socket.on('disconnect', async () => {
        disconnect = true;
        setTimeout(async () => {
          if (disconnect) {
            const response = await ChatService.updateLastActivity(userName);
            const { lastActivity } = response[1][0];
            socket.broadcast.emit('user-disconnected', { userEmail: userName, lastActivity });
            delete users[userName];
          }
        }, 30000);
      });
    });
};
export { startSocket, io, users };
