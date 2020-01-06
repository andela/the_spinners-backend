/**
 * @param {queryInterface} queryInterface
 * @param {Sequelize} Sequelize
 * @returns {create} this function creates table
*/
export const up = (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  subjectId: {
    type: Sequelize.INTEGER
  },
  subjectType: {
    type: Sequelize.STRING
  },
  comment: {
    type: Sequelize.TEXT
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
 * @param {queryInterface} queryInterface
 * @returns {drops} this function deletes table
*/
export const down = (queryInterface) => queryInterface.dropTable('Comments');
