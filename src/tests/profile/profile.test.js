import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { loggedInToken, createUsers, wrongToken, userData } from '../fixtures/users.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.use(chaiHttp);
chai.should();

describe('Test for User Account Profile:', () => {
  before(async () => {
    await cleanAllTables();
    await createUsers();
  });
  it('It should allow user to view profile', (done) => {
    chai.request(app)
      .get('/api/users/view-profile')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('message').equal('User Profile Found');
        res.body.should.have.property('data');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('birthDate');
        res.body.data.should.have.property('preferredLanguage');
        res.body.data.should.have.property('preferredCurrency');
        res.body.data.should.have.property('residence');
        res.body.data.should.have.property('department');
        done();
      });
  });

  it('It should NOT allow user to view profile: Wrong Token Provided', (done) => {
    chai.request(app)
      .get('/api/users/view-profile')
      .set('Authorization', wrongToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(403);
        res.body.should.have.property('message').equal('Wrong Token Provided');
        done();
      });
  });

  it('It should allow user to edit profile', (done) => {
    chai.request(app)
      .patch('/api/users/edit-profile')
      .set('Authorization', loggedInToken, 'Accept', 'application/json')
      .send(userData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('message').equal('Profile Updated successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('gender');
        res.body.data.should.have.property('birthDate');
        res.body.data.should.have.property('preferredLanguage');
        res.body.data.should.have.property('preferredCurrency');
        res.body.data.should.have.property('residence');
        res.body.data.should.have.property('department');
        done();
      });
  });
  it('It should NOT allow user to edit profile: Wrong input value', (done) => {
    const userGender = '';
    userData.gender = userGender;
    chai.request(app)
      .patch('/api/users/edit-profile')
      .set('Authorization', loggedInToken, 'Accept', 'application/json')
      .send(userData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.message.should.be.an('array');
        done();
      });
  });
});
