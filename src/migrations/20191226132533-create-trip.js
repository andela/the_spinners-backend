export const up = (queryInterface, Sequelize) => queryInterface.createTable('Trips', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  userId: {
    type: Sequelize.INTEGER
  },
  tripType: {
    type: Sequelize.STRING
  },
  departure: {
    type: Sequelize.STRING
  },
  destination: {
    type: Sequelize.STRING
  },
  travelDate: {
    type: Sequelize.DATE
  },
  returnDate: {
    type: Sequelize.DATE
  },
  travelReasons: {
    type: Sequelize.STRING
  },
  accommodation: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
});
export const down = (queryInterface) => { queryInterface.dropTable('Trips'); };
