export const up = (queryInterface, Sequelize) => queryInterface.createTable('Locations', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  country: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
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
export function down(queryInterface) { return queryInterface.dropTable('Locations'); }
