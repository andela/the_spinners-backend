import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';
import newTrip from '../fixtures/trip.fixture';
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
