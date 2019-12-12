import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import { signupFixtures } from '../fixtures/users.fixtures';

chai.use(chaiHttp);
chai.should();

describe('Test on user signup:', () => {
  it('It should create a new user', (done) => {
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(signupFixtures)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(201);
        res.body.should.have.property('message').equal('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id').equal(1);
        res.body.data.should.have.property('firstName').equal(`${signupFixtures.firstName}`);
        res.body.data.should.have.property('lastName').equal(`${signupFixtures.lastName}`);
        res.body.data.should.have.property('email').equal(`${signupFixtures.email}`);
        res.body.data.should.have.property('role').equal('User');
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
        res.body.should.have.property('error').equal(`${signupFixtures.email} already exist`);
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
        res.body.should.have.property('error').equal('Firstname is required');
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
        res.body.should.have.property('error').equal('Lastname is required');
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
        res.body.should.have.property('error').equal('Email is required');
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
        res.body.should.have.property('error').equal('Password is required, Max lenght 8');
        done();
      });
  });
});
