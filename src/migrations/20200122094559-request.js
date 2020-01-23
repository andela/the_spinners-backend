export const up = (queryInterface) => queryInterface.removeColumn('Requests', 'tripId');
/**
 * @exports
 * @class
 * @param {object} queryInterface
 */
export function down(queryInterface) { return queryInterface.dropTable('Requests'); }
