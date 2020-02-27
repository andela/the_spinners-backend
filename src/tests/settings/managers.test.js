import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { superAdminToken1, nonManagerToken2 } from '../fixtures/managers.fixture';

chai.should();
chai.use(chaiHttp);

describe('/Get View Users', () => {
  it('Should get all managers and their respective roles', (done) => {
    chai.request(app)
      .get('/api/users/settings/view-managers?page=1&limit=1')
      .set('Authorization', superAdminToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.data.should.have.property('pageMeta');
        res.body.data.should.have.property('rows');
        res.body.data.rows.should.be.an('array');
        res.body.data.rows[0].should.have.property('firstName');
        res.body.data.rows[0].should.have.property('lastName');
        res.body.data.rows[0].should.have.property('email');
        res.body.data.rows[0].should.have.property('role');
        res.body.should.have.property('message').equal('List of Managers');
        done();
      });
  });

  it('Should get all users and their respective roles', (done) => {
    chai.request(app)
      .get('/api/users/settings/view-managers')
      .set('Authorization', superAdminToken1)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.data.should.have.property('pageMeta');
        res.body.data.should.have.property('rows');
        res.body.data.rows.should.be.an('array');
        res.body.data.rows[0].should.have.property('firstName');
        res.body.data.rows[0].should.have.property('lastName');
        res.body.data.rows[0].should.have.property('email');
        res.body.data.rows[0].should.have.property('role');
        res.body.should.have.property('message').equal('List of Managers');
        done();
      });
  });

  it('Should get all users and their respective roles', (done) => {
    chai.request(app)
      .get('/api/users/settings/view-managers?page=1&limit=1')
      .set('Authorization', nonManagerToken2)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(403);
        res.body.should.have.property('message').equal('You are not a super admin.Action not performed');
        done();
      });
  });
});
