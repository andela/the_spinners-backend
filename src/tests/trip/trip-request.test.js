import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, userWithNoTripToken } from '../fixtures/users.fixture';
import { createTrip2 } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('/Get view requested trips ', () => {
  before(async () => {
    await createTrip2();
  });
  it('Should get requested trip', (done) => {
    chai.request(app)
      .get('/api/trips/requests?page=1&limit=1')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.data.should.have.property('pageMeta');
        res.body.data.should.have.property('rows');
        res.body.data.rows.should.be.an('array');
        res.body.data.rows[0].should.have.property('userId');
        res.body.data.rows[0].should.have.property('tripType');
        res.body.data.rows[0].should.have.property('originId');
        res.body.data.rows[0].should.have.property('destinationId');
        res.body.data.rows[0].should.have.property('departureDate');
        res.body.data.rows[0].should.have.property('returnDate');
        res.body.data.rows[0].should.have.property('travelReasons');
        res.body.data.rows[0].should.have.property('accommodationId');
        res.body.data.rows[0].should.have.property('createdAt');
        res.body.data.rows[0].should.have.property('updatedAt');
        res.body.should.have.property('message').equal('List of requested trips');
        done();
      });
  });

  it('Should get requested trip of the next page', (done) => {
    chai.request(app)
      .get('/api/trips/requests?page=1&limit=1')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.data.should.have.property('pageMeta');
        res.body.data.should.have.property('rows');
        res.body.data.rows.should.be.an('array');
        res.body.data.rows[0].should.have.property('userId');
        res.body.data.rows[0].should.have.property('tripType');
        res.body.data.rows[0].should.have.property('originId');
        res.body.data.rows[0].should.have.property('destinationId');
        res.body.data.rows[0].should.have.property('departureDate');
        res.body.data.rows[0].should.have.property('returnDate');
        res.body.data.rows[0].should.have.property('travelReasons');
        res.body.data.rows[0].should.have.property('accommodationId');
        res.body.data.rows[0].should.have.property('createdAt');
        res.body.data.rows[0].should.have.property('updatedAt');
        res.body.should.have.property('message').equal('List of requested trips');
        done();
      });
  });

  it('Should check for bad request', (done) => {
    chai.request(app)
      .get('/api/trips/requests?page=0&limit=2')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('Should not show requested trip when you did not create a trip', (done) => {
    chai.request(app)
      .get('/api/trips/requests?page=1&limit=1')
      .set('Authorization', userWithNoTripToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message');
        done();
      });
  });
});
