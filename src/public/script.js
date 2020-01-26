import { saveMessages, getAllUsers } from './chat/js/libs/http-requests.js';

const socket = window.io('http://localhost:3000');
const messageContainer = document.getElementById('messages');

const scrollToBottom = () => {
  const messages = document.querySelector('#messages').lastElementChild;
  messages.scrollIntoView();
};

const searchToObject = (search) => search.substring(1).split('&').reduce((result, value) => {
  const parts = value.split('=');
  if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  return result;
}, {});
const setReceiver = (receiver) => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('receiver', `${receiver}`);
    const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newRelativePathQuery);
  }
};

const setCurrentUser = (currentUser) => {
  if ('URLSearchParams' in window) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('currentUser', `${currentUser}`);
    const newRelativePathQuery = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newRelativePathQuery);
  }
};

const parsed = searchToObject(window.location.search);

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

socket.on('connect', () => {
  socket
    .emit('authenticate', { token: parsed.token }) // send the jwt
    .on('authenticated', () => {
      socket.on('success', async (userData) => {
        socket.emit('new-user', userData);
        setCurrentUser(userData.email);
        await getAllUsers(
          'http://localhost:3000/api/chat/users',
          parsed.token
        );
      });


      socket.on('user-connected', user => {
        appendMessage(`${user.text}`);
      });

      socket.on('updateUsersList', (users) => {
        const ol = document.createElement('ul');
        ol.setAttribute('class', 'list-style: none');

        users.forEach((user) => {
          const li = document.createElement('li');
          const i = document.createElement('i');
          i.setAttribute('class', 'fa fa-circle');


          if (user.isOnline === true) {
            i.setAttribute('style', 'color:green');
          } else {
            i.setAttribute('style', 'color:grey');
          }

          li.setAttribute('value', `${user.email}`);

          const label = document.createElement('label');

          label.appendChild(i);
          label.appendChild(document.createTextNode(`     ${user.firstName} ${user.lastName}`));


          li.appendChild(label);
          label.setAttribute('value', `${user.email}`);
          label.setAttribute('id', `${user.email}`);
          li.setAttribute('value', `${user.email}`);
          li.setAttribute('id', `${user.email}`);

          ol.appendChild(li);
          li.addEventListener('click', async (e) => {
            messageContainer.innerHTML = '';
            const currentEl = e.target.getAttribute('value');
            setReceiver(li.getAttribute('value'));
            const res = await getAllUsers(
              `http://localhost:3000/api/chat?chatUser=${li.getAttribute('value')}`,
              parsed.token
            );
            const x = ol.childNodes;
            Object.keys(x).map(o => {
              if (x[o].getAttribute('value') === currentEl) {
                return x[o].setAttribute('style', 'background: blue; color:white');
              }
              return x[o].removeAttribute('style');
            });
            res.data.messages.map(mes => socket.emit('chat_history', mes));
            li.setAttribute('class', 'activeUser');
            e.preventDefault();
          });
        });

        const usersList = document.querySelector('#users');
        usersList.innerHTML = '';
        usersList.appendChild(ol);
      });

      socket.on('new-notification', data => {
        appendMessage(`${data.message}`);
      });

      socket.on('newMessage', (message) => {
        const formattedTime = window.moment(message.createdAt).format('LT');
        const template = document.querySelector('#message-template').innerHTML;
        const html = window.Mustache.render(template, {
          from: message.sender,
          text: message.message,
          createdAt: formattedTime
        });


        const div = document.createElement('div');
        div.innerHTML = html;

        document.querySelector('#messages').appendChild(div);
        scrollToBottom();
      });

      document.querySelector('#submit-btn').addEventListener('click', async (e) => {
        e.preventDefault();
        const getReceiver = searchToObject(window.location.search);

        const result = await saveMessages(
          'http://localhost:3000/api/chat',
          parsed.token,
          { message: document.querySelector('input[name="message"]').value, receiver: getReceiver.receiver },
        );
        socket.emit('private message', result.data, () => {
          document.querySelector('input[name="message"]').value = '';
        });
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
