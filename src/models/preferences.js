export default (sequelize, DataTypes) => {
  const Preferences = sequelize.define('Preferences', {
    userId: DataTypes.INTEGER,
    isEmailNotification: DataTypes.STRING,
    isInAppNotification: DataTypes.STRING
  }, {});
  Preferences.associate = (models) => {
    // associations can be defined here
    Preferences.belongsTo(models.Users, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return Preferences;
};
