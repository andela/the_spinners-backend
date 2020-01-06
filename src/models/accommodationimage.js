export default (sequelize, DataTypes) => {
  const AccommodationImage = sequelize.define('AccommodationImage', {
    accommodationId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {});
  AccommodationImage.associate = (models) => {
    AccommodationImage.belongsTo(models.Accommodation, { foreignKey: 'accommodationId:', targetKey: 'id' });
  };
  return AccommodationImage;
};
