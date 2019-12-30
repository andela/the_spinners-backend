import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import {
  signupFixtures,
  signedUpUserToken,
  signupExpiredToken,
  unregisteredEmail,
  wrongToken,
  cleanDb
} from '../fixtures/users.fixture';

chai.use(chaiHttp);
chai.should();

describe('Test for User Signup:', () => {
  before(async () => {
    await cleanDb();
  });
  it('It should create a new user', (done) => {
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(signupFixtures)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(201);
        res.body.should.have.property('message').equal('User created successfully, Visit Your Email To Activate Account');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id');
        res.body.data.should.have.property('firstName').equal(`${signupFixtures.firstName}`);
        res.body.data.should.have.property('lastName').equal(`${signupFixtures.lastName}`);
        res.body.data.should.have.property('email').equal(`${signupFixtures.email}`);
        res.body.data.should.have.property('role').equal('Requester');
        res.body.data.should.have.property('isVerified').equal(false);
        done();
      });
  });

  it('It should NOT create a new user, Email already exist', (done) => {
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(signupFixtures)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(409);
        res.body.should.have.property('message').equal(`${signupFixtures.email} already exist`);
        done();
      });
  });

  it('It should NOT create a new user, Firstname is required', (done) => {
    const { lastName, email, password } = signupFixtures;
    const newUser = { lastName, email, password };
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('It should NOT create a new user, Lastname is required', (done) => {
    const { firstName, email, password } = signupFixtures;
    const newUser = { firstName, email, password };
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('It should NOT create a new user, Email is required', (done) => {
    const { firstName, lastName, password } = signupFixtures;
    const newUser = { firstName, lastName, password };
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });

  it('It should NOT create a new user, Password is required', (done) => {
    const { firstName, lastName, email } = signupFixtures;
    const newUser = { firstName, lastName, email };
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        done();
      });
  });
});

describe('Test for User Account Verification:', () => {
  it('Should verify a newly created user\'s account', (done) => {
    chai.request(app)
      .patch('/api/auth/user/verify')
      .set('Authorization', signedUpUserToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('message').equal('Account verified successfully. You can proceed to login');
        done();
      });
  });

  it('Should NOT reverify account: Account already verified.', (done) => {
    chai.request(app)
      .patch('/api/auth/user/verify')
      .set('Authorization', signedUpUserToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message').equal('Can\'t reverify this account. Account already verified.');
        done();
      });
  });

  it('Should NOT verify account: Wrong Token Provided', (done) => {
    chai.request(app)
      .patch('/api/auth/user/verify')
      .set('Authorization', signupExpiredToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(403);
        res.body.should.have.property('message').equal('Wrong Token Provided');
        done();
      });
  });

  it('Should NOT verify account: Forbidden. No token provided', (done) => {
    chai.request(app)
      .patch('/api/auth/user/verify')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(403);
        res.body.should.have.property('message').equal('Forbidden');
        done();
      });
  });

  it('Should NOT verify account: Wrong Token Provided', (done) => {
    chai.request(app)
      .patch('/api/auth/user/verify')
      .set('Authorization', wrongToken)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(403);
        res.body.should.have.property('message').equal('Wrong Token Provided');
        done();
      });
  });
});

describe('Test for Resend Account Verification Link:', () => {
  it('Should Resend Account Verification Link', (done) => {
    const { email } = signupFixtures;
    const inputData = { email };
    chai.request(app)
      .patch('/api/auth/user/resendLink')
      .send(inputData)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(200);
        res.body.should.have.property('message').equal('Verification Link Successfully Sent, Visit Your Email To Activate Account');
        done();
      });
  });

  it('Should NOT Resend Account Verification Link: Email Not Found in The Database', (done) => {
    const { email } = unregisteredEmail;
    const userEmail = { email };
    chai.request(app)
      .patch('/api/auth/user/resendLink')
      .send(userEmail)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('message').equal('Email Not Found in The Database. To Get a Link You Must Register');
        done();
      });
  });

  it('Should NOT Resend Account Verification Link: Email is required', (done) => {
    chai.request(app)
      .patch('/api/auth/user/resendLink')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('message');
        res.body.message[0].should.be.equal('Email is required');
        done();
      });
  });
});
