export default (sequelize, DataTypes) => {
  const AccommodationType = sequelize.define('AccommodationType', {
    type: DataTypes.STRING
  }, {});
  return AccommodationType;
};
