export default (sequelize, DataTypes) => {
  const Comments = sequelize.define('Comments', {
    userId: DataTypes.INTEGER,
    subjectId: DataTypes.INTEGER,
    subjectType: DataTypes.STRING,
    comment: DataTypes.TEXT
  }, {
    paranoid: true
  });
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.Users, { foreignKey: 'userId', targetKey: 'id' });
    Comments.belongsTo(models.Trip, { foreignKey: 'subjectId', targetKey: 'id' });
    Comments.belongsTo(models.Accommodation, { foreignKey: 'subjectId', as: 'accommodation' });
  };
  return Comments;
};
