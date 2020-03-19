import moment from 'moment';

const io = require('socket.io')();

const socketioJwt = require('socketio-jwt');

const generateMessage = (from, text) => ({
  from,
  text,
  createdAt: moment().valueOf()
});

const users = {};
const startSocket = (server) => {
  io.attach(server);
  let userName;

  io.sockets
    .on('connection', socketioJwt.authorize({ // Verify authorization for token
      secret: process.env.SECRET_KEY,
      timeout: 15000 // 15 seconds to send the authentication message
    }))
    .on('authenticated', (socket) => {
      socket.emit('success', socket.decoded_token); // Emit success message for front-end
      socket.on('new-user', (user) => { // save a new user for future needs
        userName = user.email;
        users[user.email] = socket;
        socket.broadcast.emit('user-connected', generateMessage('Admin', `${user.firstName} ${user.lastName} Joined!`));
      });
      // socket.on('private message', (msg) => {
      //   socket.emit('newMessage', generateMessage(`You --> ${msg.to}`, msg.text));
      //   users[msg.to].emit('newMessage', generateMessage(`${userName}--> ${msg.to}`, msg.text));
      // });
      socket.on('private message', (msg) => {
        socket.emit('newMessage', msg);
        if (users[msg.receiver]) {
          users[msg.receiver].emit('newMessage', msg);
        }
      });
      socket.on('chat_history', (msg) => {
        socket.emit('newMessage', msg);
      });
      socket.on('disconnect', () => {
        delete users[userName];
      });
    });
};
export { startSocket, io, users };
