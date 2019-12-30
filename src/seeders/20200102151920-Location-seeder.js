export const up = (queryInterface) => queryInterface.bulkInsert('Locations', [
  {
    country: 'Rwanda',
    city: 'Kigali',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Rwanda',
    city: 'Gisenyi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Uganda',
    city: 'Kampala',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Uganda',
    city: 'Entebee',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Kenya',
    city: 'Nairobi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Kenya',
    city: 'Mombasa',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Nigeria',
    city: 'Lagos',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Tanzania',
    city: 'Dodoma',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    country: 'Tanzania',
    city: 'Dar es salaam',
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
