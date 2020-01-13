import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  superAdminToken,
  createUsers,
  newRoleData,
  loggedInToken,
  newUserEmail
} from '../fixtures/users.fixture';

chai.use(chaiHttp);
chai.should();

describe('Test for super admin reset user role:', () => {
  before(async () => {
    await createUsers();
  });
  it('It should allow Super-Admin user to reset user role', (done) => {
    chai.request(app)
      .patch('/api/users/settings/roles')
      .set('Authorization', superAdminToken, 'Accept', 'application/json')
      .send(newRoleData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('message').equal('User role successfully updated');
        res.body.should.have.property('data');
        res.body.data.should.have.property('role').equal(`${newRoleData.userRole}`);
        done();
      });
  });

  it('It should NOT allow Non Super-Admin user to reset another user role', (done) => {
    chai.request(app)
      .patch('/api/users/settings/roles')
      .set('Authorization', loggedInToken, 'Accept', 'application/json')
      .send(newRoleData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(403);
        res.body.should.have.property('message').equal('Only super admin can reset user role');
        done();
      });
  });

  it('It should NOT allow Super-Admin user to reset user role: User Not Found', (done) => {
    newRoleData.userEmail = newUserEmail;
    chai.request(app)
      .patch('/api/users/settings/roles')
      .set('Authorization', superAdminToken, 'Accept', 'application/json')
      .send(newRoleData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('message').equal(`User role not updated. ${newUserEmail} is either a super admin or Not Registered`);
        done();
      });
  });

  it('It should NOT allow Super-Admin user to reset user role: Incomplete input data', (done) => {
    const { userRole } = newRoleData;
    const newData = { userRole };
    chai.request(app)
      .patch('/api/users/settings/roles')
      .set('Authorization', superAdminToken, 'Accept', 'application/json')
      .send(newData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });
});
