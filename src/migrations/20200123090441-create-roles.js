/**
 * @exports
 * @class
 * @param {object} queryInterface
 * @param {object} Sequelize
 */
export const up = (queryInterface, Sequelize) => queryInterface.createTable('roles', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  role: {
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
export function down(queryInterface) {
  return queryInterface.dropTable('roles');
}
