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
      .post('/api/accommodations')
      .set('Authorization', loggedInToken)
      .send(accommodation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('typeId');
        expect(res.body.data).to.have.property('from');
        expect(res.body.data).to.have.property('to');
        done();
      });
  });
  it('Should return status code of 400 for invalid tripId value type', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, tripId: '' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message[0]).eqls('tripId is not allowed');
        done();
      });
  });
  it('Should return status code of 400 if check-in date is greater than check-out date', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, from: '2020-09-30' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message[0]).eqls('check-out date must be greater than check-in date');
        done();
      });
  });
  it('Should return status code of 404 if typeId is invalid', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, typeId: 100 })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('this accommodation type id does not exist');
        done();
      });
  });
  it('Should return status code of 422 if accommodation type is not available', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, typeId: 3 })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('this accommodation type is not available');
        done();
      });
  });
});

describe('Test getting accommodation types:', () => {
  it('Should return status code of 200 with a list of available accommodation types', (done) => {
    chai.request(app)
      .get('/api/accommodations/types')
      .set('Authorization', loggedInToken)
      .send(accommodation)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('name');
        expect(res.body.data[0]).to.have.property('category');
        expect(res.body.data[0]).to.have.property('rating');
        expect(res.body.data[0]).to.have.property('locationId');
        expect(res.body.data[0]).to.have.property('numberOfPeople');
        expect(res.body.data[0]).to.have.property('numberOfRooms');
        expect(res.body.data[0]).to.have.property('isAvailable');
        done();
      });
  });
});
