import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.use(chaiHttp);
describe('Tests for user logout', () => {
  before(async () => {
    await createUsers();
  });
  it('Should logout a user', (done) => {
    chai.request(app)
      .post('/api/auth/logout')
      .set('Authorization', loggedInToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.have.property('message')
          .that.contain('Successful logout');
        done(error);
      });
  });
  it('Should not allow access to protected route after log out', (done) => {
    chai.request(app)
      .get('/api/auth/protected')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('Unauthorized access. Invalid token for this user');
        done(err);
      });
  });
});
