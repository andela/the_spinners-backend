import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import models from '../../models';
import app from '../../app';
import {
  activeUser,
  notActive,
  wrongToken,
  tokenWithWrongUser,
  wrongUser
} from '../fixtures/users.fixture';

chai.use(chaiHttp);
const router = () => chai.request(app);

const { Users } = models;

let user = null;
let token = null;
const userPassword = 'Pass1234';


describe('Tests for user login', () => {
  before(async () => {
    await Users.create(activeUser);
    await Users.create(notActive);
    user = {
      email: activeUser.email,
      password: userPassword,
    };
  });
  it('should login a user', (done) => {
    router()
      .post('/api/auth/login')
      .send(user)
      .end((err, res) => {
        token = res.body.data;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message')
          .that.contain('Successfully logged in.. redirecting');
        done(err);
      });
  });
  it('Should give err if a user not active', (done) => {
    router()
      .post('/api/auth/login')
      .send({
        email: notActive.email,
        password: userPassword,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message')
          .that.contain('You have not activated your account. Please activate your account first');
        done(err);
      });
  });
  it('Should check if not token provided', (done) => {
    router()
      .get('/api/protected')
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
    router()
      .get('/api/protected')
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
  it('Should decode correct token', (done) => {
    router()
      .get('/api/protected')
      .set('Authorization', token)
      .send({
        email: activeUser.email,
        password: userPassword,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
  it('Should slice \'Bearer\' from token token with it', (done) => {
    router()
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`)
      .send({
        email: activeUser.email,
        password: userPassword,
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done(err);
      });
  });
  it('Should return err when user or password incorrect', (done) => {
    router()
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
    router()
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
    router()
      .get('/api/protected')
      .set('Authorization', tokenWithWrongUser)
      .send({
        email: activeUser.email,
        password: userPassword,
      })
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
