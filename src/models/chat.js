export default (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    message: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
  }, {});
  Chat.associate = () => {
    // associations can be defined here
  };
  return Chat;
};
