export const up = (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  tripType: {
    type: Sequelize.STRING
  },
  tripId: {
    type: Sequelize.BIGINT
  },
  userId: {
    type: Sequelize.INTEGER
  },
  originId: {
    type: Sequelize.INTEGER
  },
  destinationId: {
    type: Sequelize.INTEGER
  },
  departureDate: {
    type: Sequelize.DATE
  },
  returnDate: {
    type: Sequelize.DATE
  },
  travelReasons: {
    type: Sequelize.STRING
  },
  accommodationId: {
    type: Sequelize.INTEGER
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
export function down(queryInterface) { return queryInterface.dropTable('Trips'); }
