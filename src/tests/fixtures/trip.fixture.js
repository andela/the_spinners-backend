import faker from 'faker';

export const trip = {
  departure: faker.address.city(),
  destination: faker.address.city(),
  travelDate: '2020-02-02',
  returnDate: '2020-02-15',
  travelReasons: faker.lorem.sentence(),
  accommodation: faker.address.streetName()
};

const newTrip = {
  departure: faker.address.city(),
  destination: faker.address.city(),
  travelDate: faker.date.future(),
  travelReasons: faker.lorem.sentence(),
  accommodation: faker.lorem.sentence()
};

export const badRequest = {
  departure: faker.address.city(),
  destination: faker.address.city(),
  travelDate: '2020-02-02',
  returnDate: '2020-02-15',
  travelReasons: faker.lorem.sentence()
};

export const checkDate = {
  departure: faker.address.city(),
  destination: faker.address.city(),
  travelDate: '2020-03-02',
  returnDate: '2020-02-15',
  travelReasons: faker.lorem.sentence(),
  accommodation: faker.address.streetName()
};

export default newTrip;
