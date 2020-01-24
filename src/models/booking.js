export default (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    userId: DataTypes.INTEGER,
    accommodationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accommodation',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    roomId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Rooms',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    from: DataTypes.DATE,
    to: DataTypes.DATE
  }, {});
  Booking.associate = (models) => {
    // associations can be defined here
    Booking.belongsTo(models.Rooms, { foreignKey: 'roomId', as: 'room' });
    Booking.belongsTo(models.Accommodation, { foreignKey: 'accommodationId', as: 'accommodation' });
  };
  return Booking;
};
