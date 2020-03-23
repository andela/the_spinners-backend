import faker from 'faker';
import chai from 'chai';
import '../../server';
import NotificationService from '../../services/notification.service';
import { activeUser, activeUserToken, } from '../fixtures/users.fixture';


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
describe('Chat Server', () => {
  /* Test 1 - A Single User */
  it('Should broadcast new user once they connect', (done) => {
    const client = io.connect(socketURL, options);
    const client1 = io.connect(socketURL, options);

    NotificationService.sendNotifications('managerEmail', 'message');
    client.on('connect', () => {
      client.emit('authenticate', { token: activeUserToken }).on('authenticated', () => {
        client.on('success', userData => {
          client.emit('new-user', userData);
        });
        NotificationService.sendNotifications('managerEmail', 'message');
        client1.on('user-connected', (user) => {
          user.should.be.a('object');
          user.email.should.equal(chatUser1.email);
          /* If this client doesn't disconnect it will interfere
          with the next test */
          client.disconnect();
          client1.disconnect();
          done();
        });
      });
    });
  });
});
