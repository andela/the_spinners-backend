/**
 * @param {queryInterface} queryInterface
 * @param {Sequelize} Sequelize
 * @returns {create} this function creates table
*/
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    tripId: {
      type: Sequelize.INTEGER
    },
    commentId: {
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
}

/**
 * @param {queryInterface} queryInterface
 * @returns {drops} this function deletes table
*/
export function down(queryInterface) {
  return queryInterface.dropTable('Comments');
}
