import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { multiCitytrip } from '../fixtures/trip.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test multi city trip:', () => {
  before(async () => {
    await createUsers();
  });
  it('Should return status code of 201 on successful trip creation', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send(multiCitytrip)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('newTrip');
        expect(res.body.data).to.have.property('newRequest');
        expect(res.body.data.newTrip[0]).to.have.property('originId');
        expect(res.body.data.newTrip[0]).to.have.property('destinationId');
        expect(res.body.data.newTrip[0]).to.have.property('travelReasons');
        expect(res.body.data.newTrip[0]).to.have.property('accommodationId');
        done();
      });
  });
  it('Should return status code of 409 with message that trip already created', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send(multiCitytrip)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into originId', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([...multiCitytrip, { ...multiCitytrip[0], originId: 'hh' }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into destinationId', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([...multiCitytrip, { ...multiCitytrip[0], destinationId: 'hh' }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into departure date', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([...multiCitytrip, { ...multiCitytrip[0], departureDate: 'hh' }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into travel reasons', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([...multiCitytrip, { ...multiCitytrip[0], travelReasons: 'hh234' }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on invalid input into accommodation', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([...multiCitytrip, { ...multiCitytrip[0], accommodationId: 'hh' }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 when he enters only one destination for multi city trip', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([{ ...multiCitytrip[0] }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 on unavailable location', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([...multiCitytrip, { ...multiCitytrip[0], originId: 999 }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 when next destination is not the same as previous origin', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', loggedInToken)
      .send([...multiCitytrip, { ...multiCitytrip[1], destinationId: 1 }])
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
