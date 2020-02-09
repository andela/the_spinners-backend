import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  activeUser,
  emailNotExists,
  createUsers,
  wrongEmail
} from '../fixtures/users.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.should();
chai.use(chaiHttp);

describe('/GET find user', () => {
  before(async () => {
    await cleanAllTables();
    await createUsers();
  });
  it('App should find a user who exists', (done) => {
    chai.request(app)
      .post('/api/auth/find-user')
      .send({ email: activeUser.email })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(200);
        res.body.should.have.property('message')
          .equal('Check your email address, copy the token and follow instruction');
        done();
      });
  });

  it('App should throw error if it finds wrong email', (done) => {
    chai.request(app)
      .post('/api/auth/find-user')
      .send({ email: wrongEmail.email })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(400);
        res.body.should.have.property('message')
          .equal('Enter valid email i.e: email@example.com');
        done();
      });
  });

  it('App should throw error if user doesn\'t exists', (done) => {
    chai.request(app)
      .post('/api/auth/find-user')
      .send({ email: emailNotExists.email })
      .end((err, res) => {
        res.body.should.be.an('object');
        res.status.should.be.equal(404);
        res.body.should.have.property('message')
          .equal(`Email ${emailNotExists.email} does not exists`);
        done();
      });
  });
});
