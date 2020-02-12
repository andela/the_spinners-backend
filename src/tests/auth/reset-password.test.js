import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  passMatch,
  resetPass,
  token,
  createUsers,
  wrongToken,
} from '../fixtures/users.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.should();
chai.use(chaiHttp);

describe('/PUT reset password', () => {
  before(async () => {
    await cleanAllTables();
    await createUsers();
  });
  it('App should reset password', (done) => {
    chai.request(app)
      .put('/api/auth/reset-password')
      .set('Authorization', token)
      .send(resetPass)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message').equal('Password reset success');
        done();
      });
  });

  it('App should check route access', (done) => {
    chai.request(app)
      .put('/api/auth/reset-password')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(403);
        res.body.should.have.property('message').equal('Forbidden');
        done();
      });
  });

  it('App should check for a valid token', (done) => {
    chai.request(app)
      .put('/api/auth/reset-password')
      .set('Authorization', wrongToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(403);
        res.body.should.have.property('message').equal('Access denied, check your email and try again');
        done();
      });
  });

  it('App should check if passwords match', (done) => {
    chai.request(app)
      .put('/api/auth/reset-password')
      .set('Authorization', token)
      .send(passMatch)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message');
        done();
      });
  });
});
