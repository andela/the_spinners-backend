import faker from 'faker';
import models from '../../models';
import { loggedInUser } from './users.fixture';
import { newTripComment } from './trip.fixture';

const { Comments } = models;

export const commentIdNotExists = faker.random.number({ min: 200, max: 200 });
export const commentIdOfOtherUser = faker.random.number({ min: 1, max: 1 });

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

export const commentToDelete = {
  id: faker.random.number({ min: 10, max: 15 }),
  userId: loggedInUser.id,
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

export const createComment = async () => {
  await Comments.destroy({ where: {} });
  await Comments.create(commentToDelete);
};
