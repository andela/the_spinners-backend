export default (sequelize, DataTypes) => {
  const Accommodation = sequelize.define('Accommodation', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    totalRooms: DataTypes.INTEGER,
    availableRooms: DataTypes.INTEGER,

  }, {});
  Accommodation.associate = (models) => {
    // associations can be defined here
    Accommodation.hasMany(models.Rooms, { foreignKey: 'accommodationId', as: 'rooms' });
    Accommodation.hasMany(models.AddOnServices, { foreignKey: 'accommodationId', as: 'addOnServices' });
    Accommodation.hasMany(models.Image, { foreignKey: 'subjectId', as: 'accommodationPictures' });
    Accommodation.hasMany(models.Amenities, { foreignKey: 'accommodationId', as: 'amenities' });
  };
  return Accommodation;
};
