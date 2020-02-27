export const up = (queryInterface, Sequelize) => queryInterface.addColumn('Locations', 'code', Sequelize.STRING);
/**
 * @exports
 * @class
 * @param {object} queryInterface
 */
export function down(queryInterface) { return queryInterface.dropTable('users'); }
