export default (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    userId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    subjectType: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {});
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' });
    Comments.belongsTo(models.Trip, { foreignKey: 'tripId', targetKey: 'id' });
  };
  return Comments;
};
