export const up = (queryInterface, Sequelize) => {
  queryInterface.changeColumn(
    'Trips',
    'tripId',
    {
      type: Sequelize.INTEGER
    }
  );
  return queryInterface.renameColumn('Trips', 'tripId', 'requestId');
};
/**
 * @exports
 * @class
 * @param {object} queryInterface
 */
export function down(queryInterface) { return queryInterface.dropTable('Trips'); }
