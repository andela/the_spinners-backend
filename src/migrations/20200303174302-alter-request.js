/**
 * @exports
 * @class
 * @param {object} queryInterface
 * @param {object} Sequelize
 */
export function up(queryInterface, Sequelize) {
  return queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('Requests', 'requesterFname', {
      type: Sequelize.DataTypes.STRING
    }, { transaction: t }),
    queryInterface.addColumn('Requests', 'requesterLname', {
      type: Sequelize.DataTypes.STRING,
    }, { transaction: t }),
    queryInterface.addColumn('Requests', 'requesterPicture', {
      type: Sequelize.DataTypes.STRING
    }, { transaction: t }),
    queryInterface.addColumn('Requests', 'tripType', {
      type: Sequelize.DataTypes.STRING
    }, { transaction: t })
  ]));
}
/**
 * @exports
 * @class
 * @param {object} queryInterface
 * @param {object} Sequelize
 */
export function down(queryInterface) { return queryInterface.dropTable('Requests'); }
