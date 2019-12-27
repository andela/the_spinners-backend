export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    userId: DataTypes.INTEGER,
    tripType: DataTypes.STRING,
    departure: DataTypes.STRING,
    destination: DataTypes.STRING,
    travelDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    travelReasons: DataTypes.STRING,
    accommodation: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  return Trip;
};
