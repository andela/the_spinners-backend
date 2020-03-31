import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('/Get view stats trips ', () => {
  it('Should get trip stats', (done) => {
    chai.request(app)
      .get('/api/trips/stats')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message').equal('Your created trip stats');
        done();
      });
  });
});
