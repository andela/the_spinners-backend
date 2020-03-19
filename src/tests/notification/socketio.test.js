import faker from 'faker';
import chai from 'chai';
import '../../server';
import NotificationService from '../../services/notification.service';
import { activeUser,
  userWithoutManager,
  loggedInToken,
  loggedInToken2,
  activeUserToken,
  token } from '../fixtures/users.fixture';


const io = require('socket.io-client');


chai.should();


const socketURL = 'http://localhost:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true
};

const chatUser1 = { email: activeUser.email,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};
const chatUser2 = 'Sally';
const chatUser3 = { email: userWithoutManager.email,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
};
describe('Chat Server', () => {
  /* Test 1 - A Single User */
  it('Should broadcast new user once they connect', (done) => {
    const client = io.connect(socketURL, options);
    const client1 = io.connect(socketURL, options);


    client.on('connect', () => {
      client.emit('authenticate', { token: activeUserToken });
    });
    client.on('authenticated', () => {
      client.emit('new-user', chatUser1);
      client.emit('chat_history', 'chatUser2');
      client1.on('user-connected', (message) => {
        message.should.be.a('object');
        message.text.should.equal(`${chatUser1.firstName} ${chatUser1.lastName} Joined!`);
        /* If this client doesn't disconnect it will interfere
        with the next test */
        client.disconnect();
        client1.disconnect();
        done();
      });
    });
  });

  /* Test 2 - User sends a private message to another user. */
  it('Should be able to send private messages', (done) => {
    let client1, client2, client3;
    const message = { sender: chatUser2.email, receiver: chatUser1.email, text: 'Private Hello World', createdAt: '2020-03-16 12:41:39.948+02' };
    let messages = 0;

    const completeTest = () => {
      messages.should.equal(3);
      client1.disconnect();
      client2.disconnect();
      client3.disconnect();
      done();
    };

    const checkPrivateMessage = (client) => {
      client.on('newMessage', (msg) => {
        message.text.should.equal(msg.text);
        messages += 1;
        if (client === client1) {
          /* The first client has received the message
            we give some time to ensure that the others
            will not receive the same message. */
          setTimeout(completeTest, 40);
        }
      });
    };

    client1 = io.connect(socketURL, options);
    checkPrivateMessage(client1);

    client1.on('connect', () => {
      client1.emit('authenticate', { token: loggedInToken });
      client1.on('authenticated', () => {
        client1.emit('new-user', chatUser1);

        client2 = io.connect(socketURL, options);
        checkPrivateMessage(client2);
        // connecting client 3
        client2.on('connect', () => {
          client2.emit('authenticate', { token });
          client2.on('authenticated', () => {
            client2.emit('new-user', chatUser2);
            // client2.emit('chat_history', chatUser2);
            client3 = io.connect(socketURL, options);
            checkPrivateMessage(client3);
            // connecting client 3
            client3.on('connect', () => {
              client3.emit('authenticate', { token: loggedInToken2 });
              client3.on('authenticated', () => {
                client3.emit('new-user', chatUser3);
                client3.emit('private message', message);
                client3.emit('private message', { ...message, receiver: 'example@test.rw' });
              });
            });
          });
        });
      });
    });
  });
  it('Should not broadcast to unconnected user connect', (done) => {
    let client1, client3;
    const message = { sender: chatUser2.email, receiver: chatUser1.email, text: 'Private Hello World', createdAt: '2020-03-16 12:41:39.948+02' };
    let messages = 0;

    const completeTest = () => {
      messages.should.equal(2);
      client1.disconnect();
      client3.disconnect();
      done();
    };

    const checkPrivateMessage = (client) => {
      client.on('newMessage', (msg) => {
        message.text.should.equal(msg.text);
        messages += 1;
        if (client === client1) {
          /* The first client has received the message
              we give some time to ensure that the others
              will not receive the same message. */
          setTimeout(completeTest, 40);
        }
      });
    };

    client1 = io.connect(socketURL, options);
    checkPrivateMessage(client1);
    client1.on('connect', () => {
      client1.emit('authenticate', { token: loggedInToken });
      client1.on('authenticated', () => {
        client1.emit('new-user', chatUser1);
        client3 = io.connect(socketURL, options);
        checkPrivateMessage(client3);
        // connecting client 3
        client3.on('connect', () => {
          client3.emit('authenticate', { token: loggedInToken2 });
          client3.on('authenticated', () => {
            client3.emit('new-user', chatUser3);
            NotificationService.sendNotifications('managerEmail', message);
            client3.emit('private message', message);
          });
        });
      });
    });
  });
});
