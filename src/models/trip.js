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
  Trip.associate = (models) => {
    // associations can be defined here
    Trip.belongsTo(models.Users, { foreignKey: 'userId', as: 'user', targetKey: 'id' });
    Trip.hasMany(models.Comments, { foreignKey: 'tripId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return Trip;
};
