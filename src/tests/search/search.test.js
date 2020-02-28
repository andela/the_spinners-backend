import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import { managerToken1, nonManagerToken, loggedInManager2 } from '../fixtures/managers.fixture';
import createRequests from '../fixtures/request.fixture';
import { createTrip, formatDate } from '../fixtures/trip.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test searching requests:', () => {
  before(async () => {
    await cleanAllTables();
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
        expect(res.body.data.rows[0]).to.have.property('status');
        expect(res.body.data.rows[0]).to.have.property('lineManagerId');
        done();
      });
  });
  it('Should return status code of 200 on with search results when searching by departureDate', (done) => {
    chai.request(app)
      .get(`/api/search?departureDate=${formatDate()}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data.rows[0]).to.have.property('id');
        expect(res.body.data.rows[0]).to.have.property('requesterId');
        expect(res.body.data.rows[0]).to.have.property('status');
        expect(res.body.data.rows[0]).to.have.property('lineManagerId');
        done();
      });
  });
  it('Should return status code of 200 on with search results when search by status and with pagination', (done) => {
    chai.request(app)
      .get('/api/search?status=pending&page=1&limit=20')
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data).to.have.property('pageMeta');
        expect(res.body.data.rows[0]).to.have.property('id');
        expect(res.body.data.rows[0]).to.have.property('requesterId');
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
      .get('/api/search?location=Andorra')
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('rows');
        expect(res.body.data.rows[0]).to.have.property('id');
        expect(res.body.data.rows[0]).to.have.property('requesterId');
        expect(res.body.data.rows[0]).to.have.property('status');
        expect(res.body.data.rows[0]).to.have.property('lineManagerId');
        done();
      });
  });
  it('Should return status code of 404 when no results found', (done) => {
    chai.request(app)
      .get(`/api/search?location=${faker.random.number({ min: 20000 })}`)
      .set('Authorization', nonManagerToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('No results found');
        done();
      });
  });
});
