import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, userWithNoTripToken, createUsers } from '../fixtures/users.fixture';
import { newComment, badRequest, noTripFound, createTrip } from '../fixtures/comments.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST create comment on trip request', () => {
  before(async () => {
    await createUsers();
    await createTrip();
  });
  it('App should create comment on trip request', (done) => {
    chai.request(app)
      .post('/api/comments')
      .set('Authorization', loggedInToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(201);
        res.body.should.have.property('message');
        done();
      });
  });

  it('App should check bad request', (done) => {
    chai.request(app)
      .post('/api/comments')
      .set('Authorization', loggedInToken)
      .send(badRequest)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('App should check if trip ID exists', (done) => {
    chai.request(app)
      .post('/api/comments')
      .set('Authorization', loggedInToken)
      .send(noTripFound)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message');
        done();
      });
  });

  it('App should check the owner of the trip', (done) => {
    chai.request(app)
      .post('/api/comments')
      .set('Authorization', userWithNoTripToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(401);
        res.body.should.have.property('message');
        done();
      });
  });

  it('App should check if comment is not duplicated', (done) => {
    chai.request(app)
      .post('/api/comments')
      .set('Authorization', loggedInToken)
      .send(newComment)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(409);
        res.body.should.have.property('message');
        done();
      });
  });
});
