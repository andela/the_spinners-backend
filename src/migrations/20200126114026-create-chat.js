const chatMigrations = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Chats', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    sender: {
      type: Sequelize.STRING
    },
    receiver: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.STRING
    },
    isRead: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
  down: (queryInterface) => queryInterface.dropTable('Chats')
};
export default chatMigrations;
