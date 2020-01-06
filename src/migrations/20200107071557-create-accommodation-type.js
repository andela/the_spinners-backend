export const up = (queryInterface, Sequelize) => queryInterface.createTable('AccommodationTypes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  stars: {
    type: Sequelize.INTEGER
  },
  locationId: {
    type: Sequelize.INTEGER
  },
  peopleCapacity: {
    type: Sequelize.INTEGER
  },
  rooms: {
    type: Sequelize.INTEGER
  },
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
/**
 * @exports
 * @class
 * @param {object} queryInterface
 */
export function down(queryInterface) { return queryInterface.dropTable('AccommodationTypes'); }
