import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { superAdminToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('/Get View Users Pagination ', () => {
  before(async () => {
    await createUsers();
  });
  it('Should get all users and their respective roles', (done) => {
    chai.request(app)
      .get('/api/users/settings/view-users-roles?page=1&limit=1')
      .set('Authorization', superAdminToken)
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
        res.body.should.have.property('message').equal('List of users and their respective roles');
        done();
      });
  });
});
