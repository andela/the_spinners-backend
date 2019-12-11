import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import userFakeData from '../fixtures/userFakeTestData';

chai.use(chaiHttp);
chai.should();

describe('Test on user signup:', () => {
  // New user account able to be created
  it('It should create a new user', (done) => {
    const newUser = {
      firstName: userFakeData.firstName,
      lastName: userFakeData.lastName,
      email: userFakeData.email,
      password: userFakeData.password
    };
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(201);
        res.body.should.have.property('message').equal('User created successfully');
        res.body.should.have.property('data');
        res.body.data.should.have.property('id').equal(1);
        res.body.data.should.have.property('firstName').equal(`${newUser.firstName}`);
        res.body.data.should.have.property('lastName').equal(`${newUser.lastName}`);
        res.body.data.should.have.property('email').equal(`${newUser.email}`);
        res.body.data.should.have.property('role').equal('User');
        res.body.data.should.have.property('isVerified').equal(false);
        done();
      });
  });

  // User email already exist
  it('It should NOT create a new user, Email already exist', (done) => {
    const newUser = {
      firstName: userFakeData.firstName,
      lastName: userFakeData.lastName,
      email: userFakeData.email,
      password: userFakeData.password
    };
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(409);
        res.body.should.have.property('error').equal(`${newUser.email} already exist`);
        done();
      });
  });

  // Incomplete inputs
  it('It should NOT create a new user, Firstname is required', (done) => {
    const newUser = {
      // firstName: userFakeData.firstName,
      lastName: userFakeData.lastName,
      email: userFakeData.email,
      password: userFakeData.password
    };
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

  // Incomplete inputs
  it('It should NOT create a new user, Lastname is required', (done) => {
    const newUser = {
      firstName: userFakeData.firstName,
      // lastName: userFakeData.lastName,
      email: userFakeData.email,
      password: userFakeData.password
    };
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

  // Incomplete inputs
  it('It should NOT create a new user, Email is required', (done) => {
    const newUser = {
      firstName: userFakeData.firstName,
      lastName: userFakeData.lastName,
      // email: userFakeData.email,
      password: userFakeData.password
    };
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

  // Incomplete inputs
  it('It should NOT create a new user, Password is required', (done) => {
    const newUser = {
      firstName: userFakeData.firstName,
      lastName: userFakeData.lastName,
      email: userFakeData.email,
      // password: userFakeData.password
    };
    chai.request(app)
      .post('/api/auth/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('error').equal('Password is required');
        done();
      });
  });
});
