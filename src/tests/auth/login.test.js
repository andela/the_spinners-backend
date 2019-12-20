import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../../app';
import {
  user,
  activeUser,
  wrongToken,
  tokenWithWrongUser,
  wrongUser,
  userPassword,
  loggedInToken,
  createUsers
} from '../fixtures/users.fixture';

chai.use(chaiHttp);

describe('Tests for user login', () => {
  before(async () => {
    await createUsers();
  });
  it('should login a user', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('string');
        expect(res.body).to.have.property('message')
          .that.contain('Successfully logged in');
        done(err);
      });
  });
  it('Should decode correct token', (done) => {
    chai.request(app)
      .get('/api/auth/protected')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
  it('Should check if not token provided', (done) => {
    chai.request(app)
      .get('/api/auth/protected')
      .set('Authorization', '')
      .send({
        email: activeUser.email,
        password: userPassword,
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message')
          .that.contain('No Token supplied');
        done(err);
      });
  });
  it('Should not authorize wrong token', (done) => {
    chai.request(app)
      .get('/api/auth/protected')
      .set('Authorization', wrongToken)
      .send({
        email: activeUser.email,
        password: userPassword,
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message')
          .that.contain('Unauthorized access. Invalid token');
        done(err);
      });
  });
  it('Should return err when user or password incorrect', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send({ email: activeUser.email, password: '122eghguvg354' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('Authentication failed. Wrong Email or Password.');
        done(err);
      });
  });
  it('Should check if a user exist', (done) => {
    chai.request(app)
      .post('/api/auth/login')
      .send(wrongUser)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('You don\'t have an account. Please create an account');
        done(err);
      });
  });
  it('Should not allow inexisting user', (done) => {
    chai.request(app)
      .get('/api/auth/protected')
      .set('Authorization', tokenWithWrongUser)
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message')
          .that.contain('Unauthorized access. Invalid token for this user');
        done(err);
      });
  });
  it('It should NOT log in, Email is required', (done) => {
    const newUser = {
      email: '',
      password: userPassword,
    };
    chai.request(app)
      .post('/api/auth/login')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message')
          .that.contain('Please enter email');
        done(err);
      });
  });

  it('It should NOT log in, Password is required', (done) => {
    const newUser = {
      email: activeUser.email,
      password: '',
    };
    chai.request(app)
      .post('/api/auth/login')
      .send(newUser)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('message')
          .that.contain('Please enter password');
        done();
      });
  });
});
