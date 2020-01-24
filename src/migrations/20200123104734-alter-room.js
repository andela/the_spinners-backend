
export const up = (queryInterface, Sequelize) => queryInterface.addColumn('Rooms', 'availableRooms', Sequelize.INTEGER);

export const down = (queryInterface) => queryInterface.removeColumn('Rooms', 'availableRooms');
