import faker from 'faker';
import models from '../../models';
import { loggedInUser } from './users.fixture';

const { Trip, Request } = models;

export const invalidId = faker.lorem.word();
export const tripIdNotExists = faker.random.number({ min: 200, max: 200 });

const today = new Date();
const desiredDeparture = new Date();
desiredDeparture.setDate(today.getDate() + 2);
const desiredReturn = new Date();
desiredReturn.setMonth(today.getMonth() + 2);

const newDate = (date) => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

export const trip = {
  originId: faker.random.number({ min: 1, max: 9 }),
  destinationId: faker.random.number({ min: 1, max: 9 }),
  departureDate: newDate(desiredDeparture),
  returnDate: newDate(desiredReturn),
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
  originId: faker.random.number({ min: 1, max: 1 }),
  destinationId: faker.random.number({ min: 1, max: 1 }),
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


const generatedTrip = {
  id: faker.random.number({ min: 100000, max: 100020 }),
  userId: loggedInUser.id,
  requestId: faker.random.number(),
  tripType: 'one-way',
  originId: faker.random.number({ min: 1, max: 2 }),
  destinationId: faker.random.number({ min: 1, max: 2 }),
  departureDate: faker.date.future(),
  travelReasons: faker.lorem.sentence(),
  accommodationId: faker.random.number()
};


export const createTrip2 = async () => {
  const request = await Request.create({ requesterId: generatedTrip.userId, status: 'pending' });
  const requestId = request.get().id;
  const { dataValues } = await Trip.create({ ...generatedTrip, requestId });
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
