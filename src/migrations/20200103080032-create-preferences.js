
const preferenceMigrations = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Preferences', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    isEmailNotification: {
      type: Sequelize.BOOLEAN,
      defaultValue: 'false'
    },
    isInAppNotification: {
      type: Sequelize.BOOLEAN,
      defaultValue: 'true'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Preferences')
};

export default preferenceMigrations;
