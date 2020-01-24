
export const up = (queryInterface, Sequelize) => queryInterface.addColumn('Bookings', 'roomId', Sequelize.INTEGER);

export const down = (queryInterface) => queryInterface.removeColumn('Bookings', 'roomId');
