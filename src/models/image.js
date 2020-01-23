export default (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    subjectId: DataTypes.INTEGER,
    subjectType: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Image.associate = (models) => {
    // associations can be defined here
    Image.belongsTo(models.Accommodation, { foreignKey: 'subjectId', as: 'accommodation' });
    Image.belongsTo(models.Rooms, { foreignKey: 'subjectId', as: 'room' });
  };
  return Image;
};
