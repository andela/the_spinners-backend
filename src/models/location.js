export default (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    country: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  return Location;
};
