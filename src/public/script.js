const socket = window.io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');

/**
 *
 * @param {*} message
 * @returns {message} message
 */
function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

const token = localStorage.getItem('token');

socket.on('connect', () => {
  socket
    .emit('authenticate', { token }) // send the jwt
    .on('authenticated', () => {
      socket.on('success', userData => {
        socket.emit('new-user', userData);
      });


      socket.on('user-connected', user => {
        appendMessage(`${user}`);
      });
      socket.on('new-notification', data => {
        appendMessage(`${data.message}`);
      });
      socket.on('private message', data => {
        appendMessage(`${data.txt}`);
      });

      socket.on('user-disconnected', user => {
        appendMessage(`${user} disconnected`);
      });
    })
    .on('unauthorized', (msg) => {
      appendMessage(`${msg.data.type}`);
      throw new Error(msg.data.type);
    });
});
