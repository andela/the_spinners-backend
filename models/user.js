/* eslint-disable no-unused-vars */
/* eslint-disable strict */

'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  // eslint-disable-next-line func-names
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
