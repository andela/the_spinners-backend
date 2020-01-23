export default (sequelize, DataTypes) => {
  const Amenities = sequelize.define('Amenities', {
    accommodationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accommodation',
        key: 'id',
      }
    },
    amenity: DataTypes.STRING
  }, {});
  Amenities.associate = (models) => {
    // associations can be defined here
    Amenities.belongsTo(models.Accommodation, { foreignKey: 'accommodationId', as: 'accommodation' });
  };
  return Amenities;
};
