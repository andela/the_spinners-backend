import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import createRequest from '../fixtures/request.fixture';
import { managerToken1, loggedInToken, managerToken2, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test rejecting a request:', () => {
  before(async () => {
    await createUsers();
    await createRequest();
  });
  it('Should return status code of 200 on successful request rejection', (done) => {
    chai.request(app)
      .patch('/api/requests/199/reject')
      .set('Authorization', managerToken1)
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
      .patch('/api/requests/44/reject')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Forbidden. Only Managers can perform this action');
        done();
      });
  });
  it('Should return status code of 400 for invalid requestId parameter', (done) => {
    chai.request(app)
      .patch('/api/requests/ghg/reject')
      .set('Authorization', managerToken1)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message[0]).eqls('requestId must be a number');
        done();
      });
  });
  it('Should return status code of 404 for requestId which does not exist', (done) => {
    chai.request(app)
      .patch('/api/requests/44/reject')
      .set('Authorization', managerToken1)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('This request does not exist');
        done();
      });
  });
  it('Should return status code of 403 for different request line manager', (done) => {
    chai.request(app)
      .patch('/api/requests/199/reject')
      .set('Authorization', managerToken2)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Forbidden. you are not line manager of this request');
        done();
      });
  });
  it('Should return status code of 422 for request which is already rejected', (done) => {
    chai.request(app)
      .patch('/api/requests/199/reject')
      .set('Authorization', managerToken1)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('This request is already rejected');
        done();
      });
  });
});
