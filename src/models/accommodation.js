export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    numberOfPeople: DataTypes.INTEGER,
    numberOfRooms: DataTypes.INTEGER,
    isAvailable: DataTypes.BOOLEAN
  }, {});
  return Accommodation;
};
