/**
 * @param {queryInterface} queryInterface
 * @param {Sequelize} Sequelize
 * @returns {ALTER} this function add column to the table
*/
export const up = (queryInterface, Sequelize) => queryInterface.addColumn('Comments', 'deletedAt', Sequelize.DATE);

/**
 * @param {queryInterface} queryInterface
 * @returns {drops} this function deletes table
*/
export const down = (queryInterface) => queryInterface.dropTable('Comments');
