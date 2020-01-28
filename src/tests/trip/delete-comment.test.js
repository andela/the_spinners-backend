import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, userWithNoTripToken } from '../fixtures/users.fixture';
import {
  commentIdNotExists,
  commentIdOfOtherUser,
  commentToDelete,
  commentOfOtherUser,
  subjectType,
  createComment
} from '../fixtures/comments.fixture';
import { invalidId, tripIdNotExists, createTrip } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('/DELETE delete comment posted on trip request', () => {
  let trip;
  before(async () => {
    await createComment();
    trip = await createTrip();
  });
  it('Should delete a comment posted on thread', (done) => {
    chai.request(app)
      .delete(`/api/trips/${trip.id}/comments/${commentToDelete.id}`)
      .set('Authorization', loggedInToken)
      .send(subjectType)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message').equal('Comment was deleted successfully');
        done();
      });
  });

  it('Should not delete a comment that was deleted before', (done) => {
    chai.request(app)
      .delete(`/api/trips/${trip.id}/comments/${commentToDelete.id}`)
      .set('Authorization', loggedInToken)
      .send(subjectType)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Comment ID does not exists or does not belong to the trip ID');
        done();
      });
  });

  it('Should check if user passed invalid trip ID or comment ID into the route', (done) => {
    chai.request(app)
      .delete(`/api/trips/${invalidId}/comments/${commentToDelete.id}`)
      .set('Authorization', loggedInToken)
      .send(subjectType)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        res.body.message[0].should.equal('Trip ID must be a number');
        done();
      });
  });

  it('Should not allow to delete comment of the trip that does not exists', (done) => {
    chai.request(app)
      .delete(`/api/trips/${tripIdNotExists}/comments/${commentToDelete.id}`)
      .set('Authorization', loggedInToken)
      .send(subjectType)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Trip ID does not exists or you does not belong to the trip ID');
        done();
      });
  });

  it('Should not allow to delete comment that does not exists', (done) => {
    chai.request(app)
      .delete(`/api/trips/${trip.id}/comments/${commentIdNotExists}`)
      .set('Authorization', loggedInToken)
      .send(subjectType)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Comment ID does not exists or does not belong to the trip ID');
        done();
      });
  });

  it('Should not authorize user to delete comment that is not owned', (done) => {
    chai.request(app)
      .delete(`/api/trips/${trip.id}/comments/${commentIdOfOtherUser}`)
      .set('Authorization', userWithNoTripToken)
      .send(subjectType)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Trip ID does not exists or you does not belong to the trip ID');
        done();
      });
  });

  it('Should not authorize user to delete comment of other trip request', (done) => {
    chai.request(app)
      .delete(`/api/trips/${trip.id}/comments/${commentOfOtherUser.id}`)
      .set('Authorization', loggedInToken)
      .send(subjectType)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Comment ID does not exists or does not belong to the trip ID');
        done();
      });
  });
});
