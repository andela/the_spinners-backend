import faker from 'faker';
import models from '../../models';
import { loggedInUser } from './users.fixture';

const { Trip, Request } = models;

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
    destinationId: faker.random.number({ min: 4, max: 9 }),
    departureDate: '2020-07-28',
    travelReasons: faker.lorem.sentence(),
    accommodationId: 5
  }
];

export const newTripComment = {
  id: faker.random.number(),
  userId: loggedInUser.id,
  requestId: faker.random.number(),
  tripType: 'one-way',
  originId: faker.random.number({ min: 1, max: 2 }),
  destinationId: faker.random.number({ min: 1, max: 2 }),
  departureDate: faker.date.future(),
  travelReasons: faker.lorem.sentence(),
  accommodationId: faker.random.number()
};
export const createTrip = async () => {
  await Trip.destroy({ where: {} });
  const request = await Request.create({ requesterId: newTripComment.userId, status: 'pending' });
  const requestId = request.get().id;
  const { dataValues } = await Trip.create({ ...newTripComment, requestId });
  return dataValues;
};

export const formatDate = () => {
  const fakerDate = new Date(newTripComment.departureDate);
  const month = (`0${fakerDate.getMonth() + 1}`).slice(-2);
  const date = (`0${fakerDate.getDate()}`).slice(-2);
  const formattedDate = `${fakerDate.getFullYear()}-${month}-${date}`;
  return formattedDate;
};

export default newTrip;
