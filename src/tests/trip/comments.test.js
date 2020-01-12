import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import { loggedInToken, userWithNoTripToken, loggedInUser, tokenOfNotAllowedManager, createUsers } from '../fixtures/users.fixture';
import { newComment, badRequest, noTripFound, createComment } from '../fixtures/comments.fixture';
import { createTrip } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST create comment on trip request', () => {
  let trip;
  before(async () => {
    await createUsers();
    await createComment();
    trip = await createTrip();
  });
  it('Should allow user to create comments when provided successfully, userId, subjectId, subjectType and comment', (done) => {
    chai.request(app)
      .post(`/api/trips/requests/${trip.id}/comments`)
      .set('Authorization', loggedInToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.data.should.have.property('userId').equal(loggedInUser.id);
        res.body.data.should.have.property('subjectId').equal(trip.id);
        res.body.data.should.have.property('subjectType').equal('Trip');
        res.body.data.should.have.property('comment');
        res.status.should.be.equal(201);
        res.body.should.have.property('message').equal('Your comment was submitted successfully');
        done();
      });
  });

  it('Should check when user do a bad request', (done) => {
    chai.request(app)
      .post(`/api/trips/requests/${faker.random.word()}/comments`)
      .set('Authorization', loggedInToken)
      .send(badRequest)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should not allow user to comment when trip ID does not exist', (done) => {
    chai.request(app)
      .post(`/api/trips/requests/${faker.random.number({ min: 51 })}/comments`)
      .set('Authorization', loggedInToken)
      .send(noTripFound)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should not allow unauthorized user to comment', (done) => {
    chai.request(app)
      .post(`/api/trips/requests/${trip.id}/comments`)
      .set('Authorization', userWithNoTripToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(401);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should not authorize a requester who is not the owner of the trip request to comment', (done) => {
    chai.request(app)
      .post(`/api/trips/requests/${trip.id}/comments`)
      .set('Authorization', userWithNoTripToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(401);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should not authorize a manager who is not assigned to a user to comment', (done) => {
    chai.request(app)
      .post(`/api/trips/requests/${trip.id}/comments`)
      .set('Authorization', tokenOfNotAllowedManager)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(401);
        res.body.should.have.property('message');
        done();
      });
  });
});
