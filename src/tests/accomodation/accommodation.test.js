import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import accommodation from '../fixtures/accommodation.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test booking accommodation:', () => {
  before(async () => {
    await createUsers();
  });
  it('Should return status code of 201 on successful accommodation creation', (done) => {
    chai.request(app)
      .post('/api/book-accommodation')
      .set('Authorization', loggedInToken)
      .send(accommodation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('Should return status code of 400 for invalid input', (done) => {
    chai.request(app)
      .post('/api/book-accommodation')
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, tripId: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 if check-in date is greater than check-out date', (done) => {
    chai.request(app)
      .post('/api/book-accommodation')
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, from: '2020-09-30' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('Should return status code of 400 if typeId is invalid', (done) => {
    chai.request(app)
      .post('/api/book-accommodation')
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, typeId: 100 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
describe('Test booking accommodation:', () => {
  it('Should return status code of 200 with a list of available accommodation types', (done) => {
    chai.request(app)
      .get('/api/accommodation-types')
      .set('Authorization', loggedInToken)
      .send(accommodation)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
