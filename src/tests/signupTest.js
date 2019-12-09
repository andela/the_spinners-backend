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
  it('It should NOT create a new user, All fields Not completed', (done) => {
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
        res.body.should.have.property('error').equal('All fields are required.');
        done();
      });
  });

  // Invalid endpoint url
  it('Should show ERROR upon invalid endpoint URL', (done) => {
    chai.request(app)
      .get('/api/amata') // Example of invalid url in our API
      .set('Accept', 'application/json')
      .end((err, res) => {
        res.body.should.be.an('object');
        res.should.have.status(404);
        res.body.should.have.property('error').equal('Ressources not found');
        done();
      });
  });
});
