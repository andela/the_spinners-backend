export const up = (queryInterface, Sequelize) => Promise.all([
  queryInterface.addColumn('Accommodation', 'likes', Sequelize.INTEGER),
  queryInterface.addColumn('Accommodation', 'disLikes', Sequelize.INTEGER),

]);
/**
 * @exports
 * @class
 * @param {object} queryInterface
 */
export const down = (queryInterface) => {
  queryInterface.removeColumn('Accommodation', 'likes');
  return queryInterface.removeColumn('Accommodation', 'disLikes');
};
