module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    token: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
  }, {});
  Users.associate = () => {
    // associations can be defined here
  };
  return Users;
};
