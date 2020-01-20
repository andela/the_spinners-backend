export default (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    accommodationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER,
    like: DataTypes.BOOLEAN,
    unlike: DataTypes.BOOLEAN
  }, {});
  return likes;
};
