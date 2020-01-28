import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';
import { createMultiCityTrip, cleanDb } from '../fixtures/trip.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test getting most traveled destinations:', () => {
  before(async () => {
    await createUsers();
    await createMultiCityTrip();
  });
  it('Should return status code of 200 on with list of most traveled destinations', (done) => {
    chai.request(app)
      .get('/api/trips/destinations/most-traveled')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data[0]).to.have.property('city');
        expect(res.body.data[0]).to.have.property('country');
        expect(res.body.data[0]).to.have.property('count');
        done();
      });
  });
  after(async () => {
    await cleanDb();
  });
});
