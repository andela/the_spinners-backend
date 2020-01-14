export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {});
  return Booking;
};
