export const up = (queryInterface, Sequelize) => queryInterface.createTable('Images', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  subjectId: {
    type: Sequelize.INTEGER
  },
  subjectType: {
    type: Sequelize.STRING
  },
  imageUrl: {
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
export function down(queryInterface) { return queryInterface.dropTable('Images'); }
