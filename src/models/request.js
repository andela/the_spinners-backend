import emitter from '../helpers/eventEmmiters/emitter';

export default (sequelize, DataTypes) => {
  const Request = sequelize.define('Request', {
    requesterId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    lineManagerId: DataTypes.INTEGER,
    tripType: DataTypes.STRING,
    requesterFname: DataTypes.STRING,
    requesterLname: DataTypes.STRING,
    requesterPicture: DataTypes.STRING,
  }, {});
  Request.associate = (models) => {
    Request.belongsTo(models.Users, { foreignKey: 'requesterId', targetKey: 'id' });
    Request.hasMany(models.Trip, { foreignKey: 'requestId' });
  };
  Request.afterUpdate((data) => {
    emitter.emit('request-updated', data);
  });
  return Request;
};
