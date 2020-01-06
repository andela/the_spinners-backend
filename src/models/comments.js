export default (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    userId: DataTypes.INTEGER,
    tripId: DataTypes.INTEGER,
    commentId: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {});
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' });
    Comments.belongsTo(models.Trip, { foreignKey: 'userId', targetKey: 'id' });
  };
  return Comments;
};
