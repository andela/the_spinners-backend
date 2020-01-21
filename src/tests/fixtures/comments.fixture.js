import faker from 'faker';
import { loggedInManager1 } from './managers.fixture';
import BcryptService from '../../services/bcrypt.service';
import models from '../../models';
import { defaultPreferences, userPassword } from './users.fixture';
import JwtService from '../../services/jwt.service';

const { Users, Trip, Preferences, Comments } = models;

export const commentIdNotExists = faker.random.number({ min: 200, max: 200 });
export const commentIdOfOtherUser = faker.random.number({ min: 1, max: 1 });
export const invalidId = faker.lorem.word();
export const tripIdNotExists = faker.random.number({ min: 200, max: 200 });

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

export const requester = {
  id: faker.random.number({ min: 700, max: 900 }),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  password: BcryptService.hashPassword(userPassword),
  isVerified: true,
  lineManagerId: loggedInManager1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const requesterToken = JwtService.generateToken({
  id: requester.id,
  firstName: requester.firstName,
  lastName: requester.lastName,
  email: requester.email
});

const tripComment = {
  userId: requester.id,
  tripType: 'one-way',
  departure: faker.address.city(),
  destination: faker.address.city(),
  travelDate: faker.date.future(),
  travelReasons: faker.lorem.sentence(),
  accommodation: faker.lorem.sentence(),
};

const newTripComment = {
  id: faker.random.number({ min: 20, max: 50 }),
  userId: requester.id,
  tripType: 'one-way',
  departure: faker.address.city(),
  destination: faker.address.city(),
  travelDate: faker.date.future(),
  travelReasons: faker.lorem.sentence(),
  accommodation: faker.lorem.sentence(),
};

export const commentToDelete = {
  id: faker.random.number({ min: 10, max: 15 }),
  userId: requester.id,
  subjectId: newTripComment.id,
  subjectType: 'Trip',
  comment: faker.lorem.sentence()
};

export const commentOfOtherUser = {
  ...commentToDelete, subjectId: faker.random.number({ min: 60, max: 65 })
};

export const subjectType = {
  subjectType: 'Trip'
};

export const createRequester = async () => {
  await Users.create({ ...requester, token: requesterToken });
  await Preferences.create({ ...defaultPreferences, userId: requesterToken.id });
  await Preferences;
};

export const createComment = async () => {
  await Comments.destroy({ where: {} });
  await Comments.create(commentToDelete);
};

export const createTrips = async () => {
  await Trip.destroy({ where: {} });
  const { dataValues } = await Trip.create(newTripComment);
  await Trip.create(tripComment);
  return dataValues;
};
