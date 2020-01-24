
export const up = (queryInterface, Sequelize) => {
  queryInterface.removeColumn('Accommodation', 'numberOfPeople');
  queryInterface.removeColumn('Accommodation', 'numberOfRooms');
  queryInterface.removeColumn('Accommodation', 'isAvailable');
  queryInterface.addColumn('Accommodation', 'totalRooms', Sequelize.INTEGER);
  queryInterface.addColumn('Accommodation', 'allAvailableRooms', Sequelize.INTEGER);
  return queryInterface.addColumn(
    'Accommodation',
    'description',
    Sequelize.STRING,
  );
};

export const down = (queryInterface, Sequelize) => {
  queryInterface.addColumn('Accommodation', 'numberOfPeople', Sequelize.INTEGER);
  queryInterface.addColumn('Accommodation', 'numberOfRooms', Sequelize.INTEGER);
  queryInterface.addColumn('Accommodation', 'isAvailable', Sequelize.BOOLEAN);
  queryInterface.removeColumn('Accommodation', 'totalRooms');
  queryInterface.removeColumn('Accommodation', 'allAvailableRooms');
  return queryInterface.removeColumn('Accommodation', 'description');
};
