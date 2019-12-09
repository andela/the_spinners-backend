import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
chai.should();

describe('Test on user signup:', () => {
  // New user account able to be created
  it('It should create a new user', (done) => {
    const newUser = {
      firstName: 'Gustave',
      lastName: 'Harintwali',
      username: 'higustave123',
      email: 'higustave@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(201);
        res.body.should.have.property('message').equal('User created successfully');
        res.body.should.have.property('data');
        done();
      });
  });

  // User email already exist
  it('It should NOT create a new user, Email already exist', (done) => {
    const newUser = {
      firstName: 'Gustave',
      lastName: 'Harintwali',
      username: 'higustave123',
      email: 'higustave@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/signup')
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
      firstName: '', // Empty field
      lastName: 'Harintwali',
      username: 'higustave123',
      email: 'higustave@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/signup')
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
      firstName: 'Gustave',
      lastName: '', // Empty field
      username: 'higustave123',
      email: 'higustave@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/signup')
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
      firstName: 'Gustave',
      lastName: 'Harintwari',
      username: 'higustave123',
      email: '', // Empty field
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/signup')
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
  it('It should NOT create a new user, Username is required', (done) => {
    const newUser = {
      firstName: 'Gustave',
      lastName: 'Harintwari',
      username: '', // Empty field
      email: 'higustave@gmail.com',
      password: '12345'
    };
    chai.request(app)
      .post('/api/v1/signup')
      .set('Accept', 'application/json')
      .send(newUser)
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(400);
        res.body.should.have.property('error').equal('Username is required');
        done();
      });
  });

  // Incomplete inputs
  it('It should NOT create a new user, Password is required', (done) => {
    const newUser = {
      firstName: 'Gustave',
      lastName: 'Harintwari',
      username: 'higustave123',
      email: 'higustave@gmail.com',
      password: '' // Empty field
    };
    chai.request(app)
      .post('/api/v1/signup')
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
