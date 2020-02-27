export default (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    code: DataTypes.STRING,
    country: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  return Location;
};
