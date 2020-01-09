const io = require('socket.io')();
const socketioJwt = require('socketio-jwt');

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
      socket.emit('success', socket.decoded_token.email); // Emit success message for front-end
      socket.on('new-user', (user) => { // save a new user for future needs
        userName = user;
        users[user] = socket;
        io.sockets.emit('user-connected', `${user} has joined.`);
      });
      socket.on('private message', (msg) => {
        const fromMsg = { from: userName, txt: msg.txt };
        users[msg.to].emit('private message', fromMsg);
      });
      socket.on('disconnect', () => {
        delete users[userName];
      });
    });
};
export { startSocket, io, users };
