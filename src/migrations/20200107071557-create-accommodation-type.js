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
  rating: {
    type: Sequelize.INTEGER
  },
  locationId: {
    type: Sequelize.INTEGER
  },
  numberOfPeople: {
    type: Sequelize.INTEGER
  },
  numberOfRooms: {
    type: Sequelize.INTEGER
  },
  isAvailable: {
    type: Sequelize.BOOLEAN,
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
