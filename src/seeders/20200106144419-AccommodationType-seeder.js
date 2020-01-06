export const up = (queryInterface) => queryInterface.bulkInsert('AccommodationTypes', [
  {
    name: 'marriott',
    category: 'hotel',
    stars: 5,
    locationId: 1,
    peopleCapacity: 500,
    rooms: 150,
    createdAt: new Date(),
    updatedAt: new Date()

  },
  {
    name: 'selena kigali',
    category: 'hotel',
    stars: 4,
    locationId: 1,
    peopleCapacity: 500,
    rooms: 150,
    createdAt: new Date(),
    updatedAt: new Date()

  },
  {
    name: 'sport view',
    category: 'hotel',
    stars: 3,
    locationId: 1,
    peopleCapacity: 300,
    rooms: 100,
    createdAt: new Date(),
    updatedAt: new Date()

  }
], {});
export const down = () => {
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('People', null, {});
  */
};
