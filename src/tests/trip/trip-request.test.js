import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, userWithNoTripToken, createUsers } from '../fixtures/users.fixture';
import { requestorToken, pendingRequest, createRequests, invalidTripRequestId } from '../fixtures/request.fixture';
import { createTrips, newCorrectlyEditedTrip, newInCorrectlyEditedTrip, newInCorrectLocationTrip } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('/Get view requested trips ', () => {
  before(async () => {
    await createUsers();
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
      .get('/api/trips/requests?page=2&limit=1')
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

describe('Test On Edit Open Trip Request', () => {
  before(async () => {
    await createTrips();
    await createRequests();
  });
  it('It should allow a user to edit his pending trip request', (done) => {
    chai.request(app)
      .patch(`/api/trips/${pendingRequest.tripId}/requests/${pendingRequest.id}`)
      .set('Authorization', requestorToken)
      .send(newCorrectlyEditedTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message').equal('Trip Updated Successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('tripType');
        res.body.data.should.have.property('tripId');
        res.body.data.should.have.property('userId');
        res.body.data.should.have.property('originId');
        res.body.data.should.have.property('destinationId');
        res.body.data.should.have.property('departureDate');
        res.body.data.should.have.property('returnDate');
        res.body.data.should.have.property('travelReasons');
        res.body.data.should.have.property('accommodationId');
        done();
      });
  });


  it('It should NOT allow a user to edit trip request:Trip Not Found', (done) => {
    chai.request(app)
      .patch(`/api/trips/${invalidTripRequestId}/requests/${pendingRequest.id}`)
      .set('Authorization', requestorToken)
      .send(newCorrectlyEditedTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Trip Not Found.');
        done();
      });
  });

  it('It should NOT allow a user to edit trip request:Trip Request For This tripId Not Found', (done) => {
    chai.request(app)
      .patch(`/api/trips/ ${pendingRequest.tripId}/requests/${invalidTripRequestId}`)
      .set('Authorization', requestorToken)
      .send(newCorrectlyEditedTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message').equal('Trip Request Not Found.');
        done();
      });
  });

  it('It should NOT allow a user to edit trip request: Travel reasons is not allowed to be empty', (done) => {
    chai.request(app)
      .patch(`/api/trips/${pendingRequest.tripId}/requests/${pendingRequest.id}`)
      .set('Authorization', requestorToken)
      .send(newInCorrectlyEditedTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        res.body.message[0].should.be.equal('Travel reasons is not allowed to be empty');
        done();
      });
  });

  it('It should NOT allow a user to edit trip request: Location Not Available', (done) => {
    chai.request(app)
      .patch(`/api/trips/${pendingRequest.tripId}/requests/${pendingRequest.id}`)
      .set('Authorization', requestorToken)
      .send(newInCorrectLocationTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Trip Not Updated. Check if two locations inputs are available and Not equal');
        done();
      });
  });
});
