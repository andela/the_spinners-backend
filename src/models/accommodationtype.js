export default (sequelize, DataTypes) => {
  const AccommodationType = sequelize.define('AccommodationType', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    stars: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    peopleCapacity: DataTypes.INTEGER,
    rooms: DataTypes.INTEGER,
    availability: DataTypes.BOOLEAN
  }, {});
  return AccommodationType;
};
