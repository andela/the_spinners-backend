export const up = (queryInterface, Sequelize) => queryInterface.createTable('AddOnServices', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  accommodationId: {
    type: Sequelize.INTEGER
  },
  serviceName: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
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
export function down(queryInterface) { return queryInterface.dropTable('AddOnServices'); }
