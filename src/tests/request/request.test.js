import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import { managerToken1, managerToken2, nonManagerToken, createManagers } from '../fixtures/managers.fixture';
import { createUsers, cleanDb } from '../fixtures/users.fixture';
import { createRequests } from '../fixtures/request.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test getting request to a manager:', () => {
  before(async () => {
    await createUsers();
    await createManagers();
    await createRequests();
  });

  it('Should get requests to a manager', (done) => {
    chai.request(app)
      .get('/api/manager/requests')
      .set('Authorization', managerToken1)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body).to.be.an('object');
        expect(res.body.message).eqls('List request directed to you');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
describe('Test approving or rejecting a request:', () => {
  let request;
  before(async () => {
    await cleanDb();
    await createManagers();
    request = await createRequests();
  });
  it('Should return status code of 200 on successful request rejection', (done) => {
    chai.request(app)
      .patch(`/api/manager/requests/${request.id}`)
      .set('Authorization', managerToken1)
      .send({ status: 'rejected' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('status');
        expect(res.body.data.status).eqls('rejected');
        done();
      });
  });
  it('Should return status code of 403 for user who is not a manager', (done) => {
    chai.request(app)
      .patch(`/api/manager/requests/${request.id}`)
      .set('Authorization', nonManagerToken)
      .send({ status: 'rejected' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Forbidden. Only Managers can perform this action');
        done();
      });
  });
  it('Should return status code of 400 for invalid requestId parameter', (done) => {
    chai.request(app)
      .patch(`/api/manager/requests/${faker.random.word()}`)
      .set('Authorization', managerToken1)
      .send({ status: 'rejected' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message[0]).eqls('requestId must be a number');
        done();
      });
  });
  it('Should return status code of 404 for requestId which does not exist', (done) => {
    chai.request(app)
      .patch(`/api/manager/requests/${faker.random.number({ min: 21 })}`)
      .set('Authorization', managerToken1)
      .send({ status: 'rejected' })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('This request does not exist');
        done();
      });
  });
  it('Should return status code of 403 for different request line manager', (done) => {
    chai.request(app)
      .patch(`/api/manager/requests/${request.id}`)
      .set('Authorization', managerToken2)
      .send({ status: 'rejected' })
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Forbidden. you are not line manager of this request');
        done();
      });
  });
  it('Should return status code of 422 for request which is already rejected', (done) => {
    chai.request(app)
      .patch(`/api/manager/requests/${request.id}`)
      .set('Authorization', managerToken1)
      .send({ status: 'rejected' })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('This request is already rejected');
        done();
      });
  });
});
