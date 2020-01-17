import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import { managerToken1, nonManagerToken, loggedInManager2 } from '../fixtures/managers.fixture';
import createRequests from '../fixtures/request.fixture';
import { createTrip, multiCitytrip } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test searching requests:', () => {
  let departuredate;
  before(async () => {
    await createRequests();
    await createTrip();
  });
  it('Should return status code of 200 on with search results when manager search by requester with pagination', (done) => {
    chai.request(app)
      .get(`/api/search?name=${loggedInManager2.firstName}`)
      .set('Authorization', managerToken1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data.rows[0]).to.have.property('id');
        expect(res.body.data.rows[0]).to.have.property('requesterId');
        expect(res.body.data.rows[0]).to.have.property('tripId');
        expect(res.body.data.rows[0]).to.have.property('status');
        expect(res.body.data.rows[0]).to.have.property('lineManagerId');
        done();
      });
  });
  it('Should return status code of 201 on successful trip creation', (done) => {
    chai.request(app)
      .post('/api/trips/multi-city')
      .set('Authorization', nonManagerToken)
      .send(multiCitytrip)
      .end((err, res) => {
        const { departureDate } = res.body.data.newTrip[0];
        departuredate = departureDate;
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
  it('Should return status code of 200 on with search results when searching by departureDate', (done) => {
    const fakerDate = new Date(departuredate);
    const month = (`0${fakerDate.getMonth() + 1}`).slice(-2);
    const date = (`0${fakerDate.getDate()}`).slice(-2);
    const formattedDate = `${fakerDate.getFullYear()}-${month}-${date}`;
    chai.request(app)
      .get(`/api/search?departureDate=${formattedDate}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data.rows[0]).to.have.property('id');
        expect(res.body.data.rows[0]).to.have.property('requesterId');
        expect(res.body.data.rows[0]).to.have.property('tripId');
        expect(res.body.data.rows[0]).to.have.property('status');
        expect(res.body.data.rows[0]).to.have.property('lineManagerId');
        done();
      });
  });
  it('Should return status code of 200 on with search results when search by status and with pagination', (done) => {
    chai.request(app)
      .get(`/api/search?status=pending&page=${faker.random.number({ min: 1, max: 1 })}&limit=${faker.random.number()}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data).to.have.property('pageMeta');
        expect(res.body.data.rows[0]).to.have.property('id');
        expect(res.body.data.rows[0]).to.have.property('requesterId');
        expect(res.body.data.rows[0]).to.have.property('tripId');
        expect(res.body.data.rows[0]).to.have.property('status');
        expect(res.body.data.rows[0]).to.have.property('lineManagerId');
        expect(res.body.data.pageMeta).to.have.property('pages');
        expect(res.body.data.pageMeta).to.have.property('currentPage');
        expect(res.body.data.pageMeta).to.have.property('pageSize');
        expect(res.body.data.pageMeta).to.have.property('count');
        done();
      });
  });
  it('Should return status code of 200 on with search results when search by location', (done) => {
    chai.request(app)
      .get('/api/search?location=rwanda')
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data.rows[0]).to.have.property('id');
        expect(res.body.data.rows[0]).to.have.property('requesterId');
        expect(res.body.data.rows[0]).to.have.property('tripId');
        expect(res.body.data.rows[0]).to.have.property('status');
        expect(res.body.data.rows[0]).to.have.property('lineManagerId');
        done();
      });
  });
  it('Should return status code of 404 when no results found', (done) => {
    chai.request(app)
      .get(`/api/search?departureDate=${faker.random.word()}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('No results found');
        done();
      });
  });
  it('Should return status code of 404 when no results found for invalid status', (done) => {
    chai.request(app)
      .get(`/api/search?status=${faker.random.word()}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('No results found');
        done();
      });
  });
  it('Should return status code of 404 when no results found for Non manager user search by name', (done) => {
    chai.request(app)
      .get(`/api/search?name=${loggedInManager2.firstName}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('No results found');
        done();
      });
  });
});
