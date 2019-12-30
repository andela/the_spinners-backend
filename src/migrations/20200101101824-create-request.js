export const up = (queryInterface, Sequelize) => queryInterface.createTable('Requests', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  requesterId: {
    type: Sequelize.INTEGER
  },
  tripId: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  managerId: {
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
export function down(queryInterface) { return queryInterface.dropTable('Requests'); }
