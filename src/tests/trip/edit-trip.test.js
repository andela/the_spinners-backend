/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, createUsers, cleanDb } from '../fixtures/users.fixture';
import {
  createPendingTrip,
  createApprovedTrip,
  correctUpdatingTrip,
  creatependingOneWayTrip,
  createFirstMulticityTrip,
  createSecondMulticityTrip,
  createThirdMulticityTrip
} from '../fixtures/trip.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.should();
chai.use(chaiHttp);

describe('/PATCH Update Open Trip Request', () => {
  let pendingTrip;
  let approvedTrip;
  let pendingOneWayTrip;
  let firstMulticityTrip;
  let secondMulticityTrip;
  let thirdMulticityTrip;
  before(async () => {
    await cleanDb();
    await cleanAllTables();
    await createUsers();
    pendingTrip = await createPendingTrip();
    approvedTrip = await createApprovedTrip();
    pendingOneWayTrip = await creatependingOneWayTrip();
    firstMulticityTrip = await createFirstMulticityTrip();
    secondMulticityTrip = await createSecondMulticityTrip();
    thirdMulticityTrip = await createThirdMulticityTrip();
  });
  it('Should allow user to update an open trip request', (done) => {
    chai.request(app)
      .patch(`/api/trips/${pendingTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send(correctUpdatingTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Trip Updated successfully');
        done();
      });
  });

  it('Should Not allow user to update a non open trip request: Trip not pending', (done) => {
    chai.request(app)
      .patch(`/api/trips/${approvedTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send(correctUpdatingTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Only Pending Trip Request Can Be Updated');
        done();
      });
  });

  it('Should allow user to update an open one way trip request', (done) => {
    chai.request(app)
      .patch(`/api/trips/${pendingOneWayTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send(correctUpdatingTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Trip Updated successfully');
        done();
      });
  });

  it('Should Not allow user to update a non existing trip request: Trip not found', (done) => {
    const tripId = 125;
    chai.request(app)
      .patch(`/api/trips/${tripId}/edit`)
      .set('Authorization', loggedInToken)
      .send(correctUpdatingTrip)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Trip Not Found.Try Another tripId');
        done();
      });
  });

  it('Should Not allow user to update a trip with same origin and destination', (done) => {
    chai.request(app)
      .patch(`/api/trips/${pendingOneWayTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send({ ...correctUpdatingTrip, originId: 10, destinationId: 10 })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Origin and destination must be different');
        done();
      });
  });

  it('Should Not allow user to update a non return trip with returnDate', (done) => {
    chai.request(app)
      .patch(`/api/trips/${pendingOneWayTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send({ ...correctUpdatingTrip, returnDate: '2021-02-20' })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Return Date Only Allowed On return Trip');
        done();
      });
  });

  it('Should allow user to update an open multi-city trip request', (done) => {
    chai.request(app)
      .patch(`/api/trips/${secondMulticityTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send({ ...correctUpdatingTrip, originId: 5 })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Trip Updated successfully');
        done();
      });
  });

  it('Should allow user to update an open multi-city trip request', (done) => {
    chai.request(app)
      .patch(`/api/trips/${firstMulticityTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send({ ...correctUpdatingTrip, destinationId: 30 })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message');
        res.body.message.should.be.equal('Trip Updated successfully');
        done();
      });
  });

  it('Should NOT allow user to update an open multi-city trip request: locations must be different', (done) => {
    chai.request(app)
      .patch(`/api/trips/${firstMulticityTrip.id}/edit`)
      .set('Authorization', loggedInToken)
      .send({ ...correctUpdatingTrip, originId: 5 })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        done();
      });
  });
});
