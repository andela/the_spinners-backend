export default (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    accommodationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accommodation',
        key: 'id',
      }
    },
    roomType: DataTypes.STRING,
    numberOfPeople: DataTypes.INTEGER,
    numberOfRooms: DataTypes.INTEGER,
    roomPrice: DataTypes.DECIMAL(10, 2)
  }, {});
  Rooms.associate = (models) => {
    // associations can be defined here
    Rooms.belongsTo(models.Accommodation, { foreignKey: 'accommodationId', as: 'accommodation' });
    Rooms.hasMany(models.Image, { foreignKey: 'subjectId', as: 'roomPictures' });
  };
  return Rooms;
};
