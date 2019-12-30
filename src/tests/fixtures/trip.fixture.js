import faker from 'faker';

export const trip = {
  originId: faker.random.number({ min: 1, max: 9 }),
  destinationId: faker.random.number({ min: 1, max: 9 }),
  departureDate: '2020-02-02',
  returnDate: '2020-02-15',
  travelReasons: faker.lorem.sentence(),
  accommodationId: faker.random.number()
};

const newTrip = {
  originId: faker.random.number({ min: 1, max: 9 }),
  destinationId: faker.random.number({ min: 1, max: 9 }),
  departureDate: faker.date.future(),
  travelReasons: faker.lorem.sentence(),
  accommodationId: faker.random.number()
};

export const badRequest = {
  originId: faker.random.number({ min: 155, max: 999 }),
  destinationId: faker.random.number({ min: 155, max: 999 }),
  departureDate: '2020-02-02',
  returnDate: '2020-02-15',
  travelReasons: faker.lorem.sentence()
};

export const checkDate = {
  originId: faker.random.number({ min: 1, max: 9 }),
  destinationId: faker.random.number({ min: 1, max: 9 }),
  departureDate: '2020-03-02',
  returnDate: '2020-02-15',
  travelReasons: faker.lorem.sentence(),
  accommodationId: faker.random.number()
};
export const multiCitytrip = [
  {
    originId: faker.random.number({ min: 1, max: 9 }),
    destinationId: 2,
    departureDate: '2020-07-25',
    travelReasons: faker.lorem.sentence(),
    accommodationId: 3
  },
  {
    originId: 2,
    destinationId: faker.random.number({ min: 1, max: 9 }),
    departureDate: '2020-07-28',
    travelReasons: faker.lorem.sentence(),
    accommodationId: 5
  }
];

export default newTrip;
