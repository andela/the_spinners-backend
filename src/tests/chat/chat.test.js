import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import '../../server';
import { createChatUsers, tokenUser, tokenUser2, createChat, user, user1 } from '../fixtures/chat.fixtures';


chai.use(chaiHttp);
const io = require('socket.io-client');

const socketURL = 'http://localhost:3000';

const options = {
  transports: ['websocket'],
  'force new connection': true
};
const client = io.connect(socketURL, options);
const client1 = io.connect(socketURL, options);
client.on('connect', () => {
  client.emit('authenticate', { token: tokenUser });
});
client.on('authenticated', () => {
  client.on('success', (userData) => {
    client.emit('new-user', userData);
  });
});
client1.on('connect', () => {
  client.emit('authenticate', { token: tokenUser2 });
});

describe('User chat', () => {
  before(async () => {
    await createChatUsers();
    await createChat();
  });

  it('should display all users', (done) => {
    chai.request(app)
      .get('/api/chat/users')
      .set('Authorization', tokenUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body).to.have.property('message')
          .that.contain('All users');
        done(err);
      });
  });
  it('should save a message', (done) => {
    chai.request(app)
      .post('/api/chat/')
      .set('Authorization', tokenUser)
      .send({
        receiver: user.email,
        message: 'Hello World'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body).to.have.property('message')
          .that.contain('message added successfully');
        done(err);
      });
  });
  it('should not emit to non connected user', (done) => {
    chai.request(app)
      .post('/api/chat/')
      .set('Authorization', tokenUser)
      .send({
        receiver: 'user.email@test.com',
        message: 'Hello World'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body).to.have.property('message')
          .that.contain('message added successfully');
        done(err);
      });
  });
  it('should get messages for a user', (done) => {
    chai.request(app)
      .get(`/api/chat?chatUser=${user.email}`)
      .set('Authorization', tokenUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('object');
        expect(res.body).to.have.property('message')
          .that.contain('messages fetched successfully');
        done(err);
      });
  });
  it('should mark messages as Read', (done) => {
    chai.request(app)
      .patch(`/api/chat/mark-all-as-read?chatUser=${user1.email}`)
      .set('Authorization', tokenUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body).to.have.property('message')
          .that.contain('message marked as read succesfully');
        done(err);
      });
  });
});
