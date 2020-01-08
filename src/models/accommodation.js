export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    typeId: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {});
  return Accommodation;
};
