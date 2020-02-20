import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import {
  superAdminToken,
  createUsers,
  newRoleData,
  loggedInToken,
  newUserEmail
} from '../fixtures/users.fixture';
import { loggedInManager1, loggedInNonManager, loggedInNonManager2, superAdminToken1, createManagers } from '../fixtures/managers.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.use(chaiHttp);
chai.should();

describe('Test for super admin reset user role:', () => {
  before(async () => {
    await cleanAllTables();
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

describe('Test assigning requester to manager', () => {
  before(async () => {
    await cleanAllTables();
    await createManagers();
  });
  it('Should return 200 response when super-adimn assign requester to manager', (done) => {
    chai.request(app)
      .patch(`/api/users/${loggedInNonManager.id}`)
      .set('Authorization', superAdminToken1)
      .send({ lineManagerId: loggedInManager1.id })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.have.property('data');
        expect(res.body.data).to.have.have.property('lineManagerId');
        done();
      });
  });
  it('Should return status code 400 when userId or lineManagerId has invalid data type', (done) => {
    chai.request(app)
      .patch(`/api/users/${faker.random.word()}`)
      .set('Authorization', superAdminToken1)
      .send({ lineManagerId: faker.random.word() })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.have.property('message');
        expect(res.body.message).includes('userId must be a number', 'lineManagerId must be a number');
      });
    done();
  });
  it('Should return status code 400 when provided userId or lineManagerId of user who does not exist', (done) => {
    chai.request(app)
      .patch(`/api/users/${faker.random.number()}`)
      .set('Authorization', superAdminToken1)
      .send({ lineManagerId: faker.random.number() })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.have.property('message');
        expect(res.body.message).eqls('This user does not exist');
        done();
      });
  });
  it('Should return status code 400 when provided lineManagerId of user who is not a manager', (done) => {
    chai.request(app)
      .patch(`/api/users/${loggedInNonManager.id}`)
      .set('Authorization', superAdminToken1)
      .send({ lineManagerId: loggedInNonManager2.id })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.have.property('message');
        expect(res.body.message).eqls('This user is not a manager');
        done();
      });
  });
});

describe('Test for super admin view users roles:', () => {
  before(async () => {
    await createUsers();
  });
  it('It should return status code 200 once a super admin successfully views users roles', (done) => {
    chai.request(app)
      .get('/api/users/settings/view-users-roles?page=1&limit=1')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('message').equal('List of users and their respective roles');
        res.body.should.have.property('data');
        res.body.data.should.have.property('pageMeta');
        res.body.data.pageMeta.should.be.an('object');
        res.body.data.should.have.property('rows');
        res.body.data.rows.should.be.an('array');
        res.body.data.rows[0].should.have.property('firstName');
        res.body.data.rows[0].should.have.property('lastName');
        res.body.data.rows[0].should.have.property('email');
        res.body.data.rows[0].should.have.property('role');
        done();
      });
  });

  it('It should return status code 403: A non super admin user trying to view users roles', (done) => {
    chai.request(app)
      .get('/api/users/settings/view-users-roles?page=1&limit=1')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(403);
        res.body.should.have.property('message').equal('You are not a super admin.Action not performed');
        done();
      });
  });

  it('It should return status code 404: No data available', (done) => {
    chai.request(app)
      .get('/api/users/settings/view-users-roles?page=20&limit=10')
      .set('Authorization', superAdminToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('message').equal('No data available');
        done();
      });
  });
});
