export const up = (queryInterface, Sequelize) => queryInterface.addColumn('Users', 'lastActivity', Sequelize.DATE);

export const down = (queryInterface) => queryInterface.removeColumn('Users', 'lastActivity');
