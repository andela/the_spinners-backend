import faker from 'faker';

const accommodation = {
  typeId: faker.random.number({ min: 1, max: 3 }),
  from: '2020-07-30',
  to: '2020-08-21'
};

export default accommodation;
