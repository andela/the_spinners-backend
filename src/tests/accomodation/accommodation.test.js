import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import accommodation from '../fixtures/accommodation.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test booking accommodation:', () => {
  before(async () => {
    await createUsers();
  });
  it('Should return status code of 201 on successful accommodation booking', (done) => {
    chai.request(app)
      .post(`/api/accommodations/${faker.random.number({ min: 1, max: 8 })}/book`)
      .set('Authorization', loggedInToken)
      .send(accommodation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('from');
        expect(res.body.data).to.have.property('to');
        expect(res.body.data).to.have.property('userId');
        expect(res.body.data).to.have.property('accommodationId');
        done();
      });
  });
  it('Should return status code of 400 for invalid accommodationId value type', (done) => {
    chai.request(app)
      .post(`/api/accommodations/${faker.random.word()}/book`)
      .set('Authorization', loggedInToken)
      .send({ ...accommodation })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message[0]).eqls('accommodationId must be a number');
        done();
      });
  });
  it('Should return status code of 400 if check-in date is greater than check-out date', (done) => {
    const fakerDate = faker.date.past();
    const month = (`0${fakerDate.getMonth() + 1}`).slice(-2);
    const date = (`0${fakerDate.getDate()}`).slice(-2);
    const formattedDate = `${fakerDate.getFullYear()}-${month}-${date}`;
    chai.request(app)
      .post(`/api/accommodations/${faker.random.number({ min: 1, max: 8 })}/book`)
      .set('Authorization', loggedInToken)
      .send({ ...accommodation, to: formattedDate })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message[0]).eqls('check-out date must be greater than check-in date');
        done();
      });
  });
  it('Should return status code of 404 if accommodationId does not exist', (done) => {
    chai.request(app)
      .post(`/api/accommodations/${faker.random.number({ min: 15 })}/book`)
      .set('Authorization', loggedInToken)
      .send({ ...accommodation })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('this accommodation id does not exist');
        done();
      });
  });
  it('Should return status code of 422 if accommodation is not available', (done) => {
    chai.request(app)
      .post(`/api/accommodations/${faker.random.number({ min: 9, max: 12 })}/book`)
      .set('Authorization', loggedInToken)
      .send({ ...accommodation })
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('this accommodation is not available');
        done();
      });
  });
});

describe('Test getting accommodations:', () => {
  it('Should return status code of 200 with a list of available accommodation types', (done) => {
    chai.request(app)
      .get('/api/accommodations')
      .set('Authorization', loggedInToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.a('array');
        expect(res.body.data[0]).to.have.property('id');
        expect(res.body.data[0]).to.have.property('name');
        expect(res.body.data[0]).to.have.property('typeId');
        expect(res.body.data[0]).to.have.property('rating');
        expect(res.body.data[0]).to.have.property('locationId');
        expect(res.body.data[0]).to.have.property('numberOfPeople');
        expect(res.body.data[0]).to.have.property('numberOfRooms');
        expect(res.body.data[0]).to.have.property('isAvailable');
        done();
      });
  });
});
