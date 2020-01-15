import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import { managerToken1, nonManagerToken, loggedInManager2 } from '../fixtures/managers.fixture';
import createRequests from '../fixtures/request.fixture';
import { createTrip } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test searching requests:', () => {
  before(async () => {
    await createRequests();
    await createTrip();
  });
  it('Should return status code of 200 on with search results when manager search by requester', (done) => {
    chai.request(app)
      .get(`/api/search?term=${loggedInManager2.firstName}`)
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
  it('Should return status code of 200 on with search results', (done) => {
    const fakerDate = faker.date.future();
    const month = (`0${fakerDate.getMonth() + 1}`).slice(-2);
    const date = (`0${fakerDate.getDate()}`).slice(-2);
    const formattedDate = `${fakerDate.getFullYear()}-${month}-${date}`;
    chai.request(app)
      .get(`/api/search?term=${formattedDate}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        done();
      });
  });
  it('Should return status code of 200 on with search results when search by status', (done) => {
    chai.request(app)
      .get('/api/search?term=pending')
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        done();
      });
  });
  it('Should return status code of 200 on with search results and with pagination', (done) => {
    chai.request(app)
      .get(`/api/search?term=${faker.random.word()}&page=${faker.random.number()}&limit=${faker.random.number()}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        done();
      });
  });
  it('Should return status code of 200 on with search results when search by location', (done) => {
    chai.request(app)
      .get('/api/search?term=rwanda')
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        done();
      });
  });
});
