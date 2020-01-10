import faker from 'faker';
import models from '../../models';
import { loggedInUser } from './users.fixture';

const { Trip } = models;

const comment = faker.lorem.sentence();
export const newComment = {
  comment
};

export const badRequest = {
  comment: faker.lorem.sentence()
};

export const noTripFound = {
  comment: faker.lorem.sentence()
};

const newTrip = {
  userId: loggedInUser.id,
  tripType: 'one-way',
  departure: faker.address.city(),
  destination: faker.address.city(),
  travelDate: faker.date.future(),
  travelReasons: faker.lorem.sentence(),
  accommodation: faker.lorem.sentence(),
};

export const createTrip = async () => {
  await Trip.destroy({ where: {} });
  await Trip.create(newTrip);
};
