
const notificationMigrations = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
    },
    message: {
      type: Sequelize.TEXT
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    requestId: {
      type: Sequelize.INTEGER
    },
    type: Sequelize.STRING,
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Notifications')
};
export default notificationMigrations;
