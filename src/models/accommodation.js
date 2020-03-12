export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    totalRooms: DataTypes.INTEGER,
    allAvailableRooms: DataTypes.INTEGER,
    likes: DataTypes.INTEGER,
    disLikes: DataTypes.INTEGER

  }, {});
  Accommodation.associate = (models) => {
    // associations can be defined here
    Accommodation.hasMany(models.Rooms, { foreignKey: 'accommodationId', as: 'rooms', onDelete: 'cascade', hooks: true });
    Accommodation.hasMany(models.AddOnServices, { foreignKey: 'accommodationId', as: 'addOnServices', onDelete: 'CASCADE', hooks: true });
    Accommodation.hasMany(models.Image, { foreignKey: 'subjectId', as: 'accommodationPictures', onDelete: 'CASCADE', hooks: true });
    Accommodation.hasMany(models.Amenities, { foreignKey: 'accommodationId', as: 'amenities', onDelete: 'CASCADE', hooks: true });
    Accommodation.hasMany(models.Booking, { foreignKey: 'accommodationId', as: 'bookings', onDelete: 'cascade', hooks: true });
    Accommodation.hasMany(models.Comments, { foreignKey: 'subjectId', as: 'accommodationComments', onDelete: 'CASCADE', hooks: true });
  };
  return Accommodation;
};
