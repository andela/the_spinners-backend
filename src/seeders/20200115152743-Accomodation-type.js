export const up = (queryInterface) => queryInterface.bulkInsert('AccommodationTypes', [
  {
    type: 'Hotel',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    type: 'Motel',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    type: 'Bed and Breakfast',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    type: 'INN',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    type: 'Hostel',
    createdAt: new Date(),
    updatedAt: new Date()
  },
], {});
export const down = () => {
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('People', null, {});
  */
};
