import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import faker from 'faker';
import app from '../../app';
import newTrip from '../fixtures/trip.fixture';
import { createNotifications, unreadNotification, readNotification } from '../fixtures/notification.fixtures';
import {
  loggedInToken,
  createUsers,
  loggedInToken2,
} from '../fixtures/users.fixture';

chai.use(chaiHttp);

describe('Tests notification preferences', () => {
  beforeEach(async () => {
    await createUsers();
  });
  it('Should get all notification of a logged in user', (done) => {
    chai.request(app)
      .get('/api/notifications')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').that.contain.property('unread');
        expect(res.body).to.have.property('data').that.contain.property('notifications');
        done(err);
      });
  });
  it('Should not set preferred email notification mode twice', (done) => {
    chai.request(app)
      .put('/api/notifications')
      .set('Authorization', loggedInToken)
      .send({ isEmailNotification: 'true' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('This option has been already set for this notification mode');
        done(err);
      });
  });
  it('Should not set preferred in-App notification mode twice', (done) => {
    chai.request(app)
      .put('/api/notifications')
      .set('Authorization', loggedInToken)
      .send({ isInAppNotification: 'true' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('This option has been already set for this notification mode');
        done(err);
      });
  });
  it('Should set preferred email notification mode to false', (done) => {
    chai.request(app)
      .put('/api/notifications')
      .set('Authorization', loggedInToken)
      .send({ isEmailNotification: 'false' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('Successfully updated your email notification preferences.');
        done(err);
      });
  });
  it('Should set preferred inApp notification mode to false', (done) => {
    chai.request(app)
      .put('/api/notifications')
      .set('Authorization', loggedInToken)
      .send({ isInAppNotification: 'false' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('Successfully updated your in-app notification preferences.');
        done(err);
      });
  });

  it('Should not accept requests with no manager', (done) => {
    chai.request(app)
      .post('/api/one-way-trips')
      .set('Authorization', loggedInToken2)
      .send({ ...newTrip, travelDate: '2020-05-23' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('You don\'t have manager assigned yet. Please contact Admin');
        done(err);
      });
  });
});

describe('Mark all notifications as read', () => {
  beforeEach(() => {
    createNotifications();
  });
  it('Should mark all unread notifications as read', (done) => {
    chai.request(app)
      .patch('/api/notifications/mark-all-as-read')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .that.contain('Notifications successfully marked as read');
        done(err);
      });
  });
  it('Should recognize that there are no unreads', (done) => {
    chai.request(app)
      .patch('/api/notifications/mark-all-as-read')
      .set('Authorization', loggedInToken2)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('message')
          .that.contain('You don\'t have unread notifications');
        done(err);
      });
  });
});

describe('Mark notifications as read', () => {
  beforeEach(async () => {
    await createUsers();
    await createNotifications();
  });
  it('Should mark one unread notification  as read', (done) => {
    chai.request(app)
      .patch(`/api/notifications/mark-as-read/${unreadNotification.id}`)
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message')
          .that.contain('Notification successfully marked as read');
        done(err);
      });
  });
  it('Should reject notification id that doesn\'t exist', (done) => {
    chai.request(app)
      .patch(`/api/notifications/mark-as-read/${faker.random.number({ min: 1, max: 40 })}`)
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message')
          .that.contain('Notification ID does not exists');
        done(err);
      });
  });
  it('Should recognize read notifications', (done) => {
    chai.request(app)
      .patch(`/api/notifications/mark-as-read/${readNotification.id}`)
      .set('Authorization', loggedInToken2)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('message')
          .that.contain('This Notification is already read.');
        done(err);
      });
  });
  it('Should not modify notification which is not yours', (done) => {
    chai.request(app)
      .patch(`/api/notifications/mark-as-read/${unreadNotification.id}`)
      .set('Authorization', loggedInToken2)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('message')
          .that.contain('You can\'t modify notification which does\'t belong to you');
        done(err);
      });
  });
});
