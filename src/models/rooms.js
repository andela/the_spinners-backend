export default (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    accommodationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accommodation',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    roomType: DataTypes.STRING,
    numberOfPeople: DataTypes.INTEGER,
    numberOfRooms: DataTypes.INTEGER,
    availableRooms: DataTypes.INTEGER,
    roomPrice: DataTypes.DECIMAL(10, 2),
    likesCount: DataTypes.INTEGER,
    dislikesCount: DataTypes.INTEGER
  }, {});
  Rooms.associate = (models) => {
    // associations can be defined here
    Rooms.belongsTo(models.Accommodation, { foreignKey: 'accommodationId', as: 'accommodation' });
    Rooms.hasMany(models.Image, { foreignKey: 'subjectId', as: 'roomPictures', onDelete: 'cascade', hooks: true });
    Rooms.hasMany(models.Booking, { foreignKey: 'roomId', as: 'bookings', onDelete: 'cascade', hooks: true });
  };
  return Rooms;
};
