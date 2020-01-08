import faker from 'faker';

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
