export default (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    role: DataTypes.STRING
  }, {});
  return roles;
};
