export const up = (queryInterface, Sequelize) => queryInterface.createTable('Accommodation', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  typeId: {
    type: Sequelize.INTEGER
  },
  from: {
    type: Sequelize.DATE
  },
  to: {
    type: Sequelize.DATE
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
export function down(queryInterface) { return queryInterface.dropTable('Accommodation'); }
