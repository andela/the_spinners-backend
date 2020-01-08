export default (sequelize, DataTypes) => {
  const AccommodationType = sequelize.define('AccommodationType', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    numberOfPeople: DataTypes.INTEGER,
    numberOfRooms: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN
  }, {});
  return AccommodationType;
};
