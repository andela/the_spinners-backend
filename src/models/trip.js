import emitter from '../helpers/eventEmmiters/emitter';

export default (sequelize, DataTypes) => {
  const Trip = sequelize.define('Trip', {
    tripType: DataTypes.STRING,
    tripId: DataTypes.BIGINT,
    userId: DataTypes.INTEGER,
    originId: DataTypes.INTEGER,
    destinationId: DataTypes.INTEGER,
    departureDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    travelReasons: DataTypes.STRING,
    accommodationId: DataTypes.INTEGER
  }, {});
  Trip.associate = (models) => {
    Trip.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' });
    Trip.belongsTo(models.Location, { foreignKey: 'originId', targetKey: 'id' });
    Trip.belongsTo(models.Location, { foreignKey: 'destinationId', targetKey: 'id' });
  };
  Trip.afterCreate(({ dataValues }) => {
    emitter.emit('request-created', dataValues);
  });
  return Trip;
};
