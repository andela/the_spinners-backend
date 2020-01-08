import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, userWithNoTripToken, createUsers } from '../fixtures/users.fixture';
import { newComment, badRequest, noTripFound, createTrip } from '../fixtures/comments.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST create comment on trip request', () => {
  before(async () => {
    await createTrip();
    await createUsers();
  });
  it('Should allow user to create comments when provided successfully, userId, subjectId, subjectType and comment', (done) => {
    chai.request(app)
      .post('/api/trips/1/comment')
      .set('Authorization', loggedInToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.body.data.should.have.property('userId').equal(30);
        res.body.data.should.have.property('subjectId').equal(1);
        res.body.data.should.have.property('subjectType').equal('Trip');
        res.body.data.should.have.property('comment');
        res.status.should.be.equal(201);
        res.body.should.have.property('message').equal('Your comment was submitted successfully');
        done();
      });
  });

  it('Should check when user do a bad request', (done) => {
    chai.request(app)
      .post('/api/trips/NaN/comment')
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
      .post('/api/trips/99/comment')
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
      .post('/api/trips/1/comment')
      .set('Authorization', userWithNoTripToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(401);
        res.body.should.have.property('message');
        done();
      });
  });
});
