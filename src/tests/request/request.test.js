import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import createRequests from '../fixtures/request.fixture';
import { managerToken1, createManagers } from '../fixtures/manager.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test rejecting a request:', () => {
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
  it('Should return status code of 403 for user who is not a manager', (done) => {
    chai.request(app)
      .get('/api/manager/requests')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Forbidden. Only Managers can perform this action');
        done();
      });
  });
});
