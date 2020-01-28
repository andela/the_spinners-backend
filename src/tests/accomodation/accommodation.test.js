import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../../app';
import {
  booking,
  createTravelAdmin,
  travelAdminToken,
  newAccomodation,
  crateMultipleAccommodations
} from '../fixtures/accommodation.fixture';
import { loggedInToken, createUsers } from '../fixtures/users.fixture';
import cleanAllTables from '../fixtures/database.fixture';

chai.should();
chai.use(chaiHttp);

describe('Test booking accommodation:', () => {
  before(async () => {
    await cleanAllTables();
    await createUsers();
    await crateMultipleAccommodations();
  });
  it('Should return status code of 201 on successful accommodation booking', (done) => {
    chai.request(app)
      .post('/api/accommodations/1/rooms/1/book')
      .set('Authorization', loggedInToken)
      .send(booking)
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
  it('Should not allow duplicate booking at the same time', (done) => {
    chai.request(app)
      .post('/api/accommodations/1/rooms/1/book')
      .set('Authorization', loggedInToken)
      .send(booking)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('You have an existing booking in this time period');
        done();
      });
  });
  it('Should return status code of 400 for invalid accommodationId value type', (done) => {
    chai.request(app)
      .post(`/api/accommodations/${faker.random.word()}/rooms/${faker.random.number({ min: 1, max: 8 })}/book`)
      .set('Authorization', loggedInToken)
      .send({ ...booking })
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
      .post(`/api/accommodations/1/rooms/${faker.random.number({ min: 1, max: 3 })}/book`)
      .set('Authorization', loggedInToken)
      .send({ ...booking, to: formattedDate })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message');
        expect(res.body.message[0]).eqls('check-out date must be greater than check-in date');
        done();
      });
  });
  it('Should return status code of 404 if accommodationId/ Room Id does not exist', (done) => {
    chai.request(app)
      .post(`/api/accommodations/${faker.random.number({ min: 15 })}/rooms/${faker.random.number({ min: 30, max: 40 })}/book`)
      .set('Authorization', loggedInToken)
      .send({ ...booking })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('The accommodation Id or room id are not available');
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
        done();
      });
  });
});

describe('Create accommmodation', () => {
  before(async () => {
    await createTravelAdmin();
  });
  it('Should create an accomodation', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', travelAdminToken)
      .send(newAccomodation)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.property('id');
        expect(res.body.data).to.have.property('name');
        expect(res.body.data).to.have.property('typeId');
        expect(res.body.data).to.have.property('description');
        expect(res.body.data).to.have.property('locationId');
        expect(res.body.data).to.have.property('accommodationPictures');
        expect(res.body.data.accommodationPictures).to.be.an('array');
        expect(res.body.data.accommodationPictures[0]).to.have.property('id');
        expect(res.body.data.accommodationPictures[0]).to.have.property('subjectId');
        expect(res.body.data.accommodationPictures[0]).to.have.property('subjectType');
        expect(res.body.data.accommodationPictures[0]).to.have.property('imageUrl');
        expect(res.body.data).to.have.property('addOnServices');
        expect(res.body.data.addOnServices).to.be.an('array');
        expect(res.body.data.addOnServices[0]).to.have.property('id');
        expect(res.body.data.addOnServices[0]).to.have.property('serviceName');
        expect(res.body.data.addOnServices[0]).to.have.property('price');
        expect(res.body.data.addOnServices[0]).to.have.property('description');
        expect(res.body.data.addOnServices[0]).to.have.property('accommodationId');
        expect(res.body.data).to.have.property('amenities');
        expect(res.body.data.amenities).to.be.an('array');
        expect(res.body.data.amenities[0]).to.have.property('id');
        expect(res.body.data.amenities[0]).to.have.property('amenity');
        expect(res.body.data.amenities[0]).to.have.property('accommodationId');
        expect(res.body.data).to.have.property('rooms');
        expect(res.body.data.rooms).to.be.an('array');
        expect(res.body.data.rooms[0]).to.have.property('id');
        expect(res.body.data.rooms[0]).to.have.property('roomType');
        expect(res.body.data.rooms[0]).to.have.property('numberOfPeople');
        expect(res.body.data.rooms[0]).to.have.property('roomPictures');
        expect(res.body.data.rooms[0]).to.have.property('roomPrice');
        expect(res.body.data.rooms[0]).to.have.property('numberOfRooms');
        done();
      });
  });
  it('should not allow non travel-admin or suppliers', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', loggedInToken)
      .send(newAccomodation)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Only travel admin and travel team member can create accommodation');
        done();
      });
  });
  it('should not allow duplicate accommodation', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', travelAdminToken)
      .send(newAccomodation)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('This accomodation already exists');
        done();
      });
  });
  it('Should return status code of 404 if location doesn\'t exist', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', travelAdminToken)
      .send({ ...newAccomodation, locationId: faker.random.number({ min: 1022 }) })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Location Id you specified doesn\'t exists');
        done();
      });
  });
  it('Should return status code of 404 if accomodation type doesn\'t exist', (done) => {
    chai.request(app)
      .post('/api/accommodations')
      .set('Authorization', travelAdminToken)
      .send({
        ...newAccomodation,
        locationId: faker.random.number({ min: 1, max: 9 }),
        typeId: faker.random.number({ min: 10000000000, max: 15000000000 }), })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('message');
        expect(res.body.message).eqls('Accomodation type you specified doesn\'t exists');
        done();
      });
  });
});
