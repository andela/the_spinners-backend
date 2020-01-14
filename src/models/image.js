export default (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    subjectId: DataTypes.INTEGER,
    subjectType: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  return Image;
};
