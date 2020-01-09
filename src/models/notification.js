export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    userId: DataTypes.INTEGER,
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isRead: DataTypes.BOOLEAN,
    type: DataTypes.BOOLEAN,
    requestId: DataTypes.STRING
  }, {});
  Notifications.associate = (models) => {
    // associations can be defined here
    Notifications.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return Notifications;
};
