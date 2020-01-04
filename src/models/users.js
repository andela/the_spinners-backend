export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    preferredLanguage: DataTypes.STRING,
    preferredCurrency: DataTypes.STRING,
    residence: DataTypes.STRING,
    department: DataTypes.STRING,
    lineManagerId: DataTypes.INTEGER,
    role: DataTypes.ENUM('super_admin', 'travel_admin', 'travel_team_member', 'manager', 'requester'),
    profilePicture: DataTypes.STRING(1234),
    token: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {});
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.Trip, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Users;
};
