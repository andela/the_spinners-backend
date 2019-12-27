import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  trip,
  badRequest,
  checkDate
} from '../fixtures/trip.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST create return trip', () => {
  before(async () => {
    await createUsers();
  });
  it('App should create a return trip', (done) => {
    chai.request(app)
      .post('/api/return-trip')
      .set('Authorization', loggedInToken)
      .send(trip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(201);
        res.body.should.have.property('message').equal('Trip created successfully');
        done();
      });
  });

  it('App should check bad request', (done) => {
    chai.request(app)
      .post('/api/return-trip')
      .set('Authorization', loggedInToken)
      .send(badRequest)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message').equal('Accommodation is required');
        done();
      });
  });

  it('App travel and return date', (done) => {
    chai.request(app)
      .post('/api/return-trip')
      .set('Authorization', loggedInToken)
      .send(checkDate)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message').equal('Travel date can not be greater than return date');
        done();
      });
  });

  it('App should check if trip exists', (done) => {
    chai.request(app)
      .post('/api/return-trip')
      .set('Authorization', loggedInToken)
      .send(trip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(409);
        res.body.should.have.property('message');
        done();
      });
  });
});
