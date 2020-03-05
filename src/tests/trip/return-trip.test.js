import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  trip,
  badRequest,
  checkDate,
  sameLocationTrip
} from '../fixtures/trip.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.should();
chai.use(chaiHttp);

describe('/POST create return trip', () => {
  before(async () => {
    await cleanAllTables();
    await createUsers();
  });
  it('App should create a return trip', (done) => {
    chai.request(app)
      .post('/api/trips/return')
      .set('Authorization', loggedInToken)
      .send(trip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(201);
        res.body.should.have.property('message').equal('Trip created successfully');
        done();
      });
  });

  it('Should return an error when trip has same location', (done) => {
    chai.request(app)
      .post('/api/trips/return')
      .set('Authorization', loggedInToken)
      .send(sameLocationTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message').equal('Origin and destination must be different');
        done();
      });
  });

  it('App should check bad request', (done) => {
    chai.request(app)
      .post('/api/trips/return')
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
      .post('/api/trips/return')
      .set('Authorization', loggedInToken)
      .send(checkDate)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should return status code of 400 on all invalid inputs', (done) => {
    chai.request(app)
      .post('/api/trips/return')
      .set('Authorization', loggedInToken)
      .send({})
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        done();
      });
  });

  it('App should check if trip exists', (done) => {
    chai.request(app)
      .post('/api/trips/return')
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
      .post('/api/trips/return')
      .set('Authorization', loggedInToken)
      .send({ ...trip, originId: 999 })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        done();
      });
  });
});
