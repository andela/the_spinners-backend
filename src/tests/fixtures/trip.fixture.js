/* eslint-disable no-unused-vars */
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
  originId: 10,
  destinationId: 11,
  departureDate: '2020-12-12',
  returnDate: '2020-12-28',
  travelReasons: 'Visiting friends',
  accommodationId: 5
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
    originId: 1,
    destinationId: 2,
    departureDate: '2020-07-25',
    travelReasons: faker.lorem.sentence(),
    accommodationId: 3
  },
  {
    originId: 2,
    destinationId: 3,
    departureDate: '2020-07-28',
    travelReasons: faker.lorem.sentence(),
    accommodationId: 5
  },
  {
    originId: 3,
    destinationId: 4,
    departureDate: '2020-07-29',
    travelReasons: faker.lorem.sentence(),
    accommodationId: 6
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

export const pendingTrip = {
  id: 1000000,
  userId: loggedInUser.id,
  requestId: 3000000,
  tripType: 'multi-city',
  originId: 3,
  destinationId: 4,
  departureDate: '2020-12-25',
  travelReasons: 'Visiting friends',
  accommodationId: 2
};
export const createPendingTrip = async () => {
  const request = await Request.create({
    id: pendingTrip.requestId,
    requesterId: pendingTrip.userId,
    status: 'pending'
  });
  const { dataValues } = await Trip.create({
    ...pendingTrip,
    requestId: request.id
  });
  return dataValues;
};

export const approvedTrip = {
  id: 2000000,
  userId: loggedInUser.id,
  requestId: 4000000,
  tripType: 'multi-city',
  originId: 4,
  destinationId: 5,
  departureDate: '2020-10-12',
  travelReasons: 'Attend a meeting',
  accommodationId: 3
};
export const createApprovedTrip = async () => {
  const request = await Request.create({
    id: approvedTrip.requestId,
    requesterId: approvedTrip.userId,
    status: 'approved'
  });
  const { dataValues } = await Trip.create({
    ...approvedTrip,
    requestId: request.id
  });
  return dataValues;
};

export const pendingOneWayTrip = {
  id: 7000000,
  userId: loggedInUser.id,
  requestId: 5000000,
  tripType: 'one-way',
  originId: 6,
  destinationId: 10,
  departureDate: '2020-05-30',
  travelReasons: 'Bootcamp supervision',
  accommodationId: 7
};
export const creatependingOneWayTrip = async () => {
  const request = await Request.create({
    id: pendingOneWayTrip.requestId,
    requesterId: pendingOneWayTrip.userId,
    status: 'pending'
  });
  const { dataValues } = await Trip.create({
    ...pendingOneWayTrip,
    requestId: request.id
  });
  return dataValues;
};

export const correctUpdatingTrip = {
  originId: 7,
  destinationId: 4,
  departureDate: '2020-12-25',
  travelReasons: 'Visiting friends',
  accommodationId: 2
};

export const firstMulticityTrip = {
  id: 500,
  userId: loggedInUser.id,
  requestId: 200,
  tripType: 'multi-city',
  originId: 10,
  destinationId: 15,
  departureDate: '2020-10-10',
  travelReasons: 'DevC Meeting',
  accommodationId: 7
};
export const createFirstMulticityTrip = async () => {
  const { dataValues } = await Trip.create({
    ...firstMulticityTrip,
    requestId: firstMulticityTrip.requestId
  });
  return dataValues;
};

export const secondMulticityTrip = {
  id: 501,
  userId: loggedInUser.id,
  requestId: 200,
  tripType: 'multi-city',
  originId: 15,
  destinationId: 16,
  departureDate: '2020-10-11',
  travelReasons: 'Meeting friends',
  accommodationId: 6
};
export const createSecondMulticityTrip = async () => {
  const request = await Request.create({
    id: secondMulticityTrip.requestId,
    requesterId: secondMulticityTrip.userId,
    status: 'pending'
  });
  const { dataValues } = await Trip.create({
    ...secondMulticityTrip,
    requestId: request.id
  });
  return dataValues;
};

export const thirdMulticityTrip = {
  id: 502,
  userId: loggedInUser.id,
  requestId: 200,
  tripType: 'multi-city',
  originId: 16,
  destinationId: 17,
  departureDate: '2020-10-12',
  travelReasons: 'Family issues',
  accommodationId: 9
};
export const createThirdMulticityTrip = async () => {
  const { dataValues } = await Trip.create({
    ...thirdMulticityTrip,
    requestId: thirdMulticityTrip.requestId
  });
  return dataValues;
};

export const sameLocationTrip = {
  originId: faker.random.number({ min: 1, max: 1 }),
  destinationId: faker.random.number({ min: 1, max: 1 }),
  departureDate: '2020-12-20',
  returnDate: '2020-12-31',
  travelReasons: faker.lorem.sentence(),
  accommodationId: faker.random.number()
};

const generatedTrip = {
  id: 1000,
  userId: loggedInUser.id,
  requestId: 1001,
  tripType: 'one-way',
  originId: 30,
  destinationId: 31,
  departureDate: '2020-04-21',
  travelReasons: 'Any reason',
  accommodationId: 9
};

export const createTrip2 = async () => {
  const request = await Request.create({ requesterId: generatedTrip.userId, status: 'pending' });
  const { dataValues } = await Trip.create({
    ...generatedTrip,
    requestId: generatedTrip.requestId
  });
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
