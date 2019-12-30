import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  trip,
  badRequest,
  checkDate
} from '../fixtures/trip.fixture';
import { loggedInToken, createUsers, cleanDb } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST create return trip', () => {
  before(async () => {
    await cleanDb();
  });
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
      .send({ ...badRequest, travelReasons: '' })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
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
        res.body.should.have.property('message');
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
  it('Should return status code of 400 on unavailable location', (done) => {
    chai.request(app)
      .post('/api/return-trip')
      .set('Authorization', loggedInToken)
      .send({ ...trip, originId: 999 })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        done();
      });
  });
});
