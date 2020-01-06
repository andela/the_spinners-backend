import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test getting locations:', () => {
  before(async () => {
    await createUsers();
  });
  it('Should return status code of 200 with all available locations', (done) => {
    chai.request(app)
      .get('/api/locations')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.have.property('country');
        expect(res.body.data[0]).to.have.property('city');
        done();
      });
  });
});
