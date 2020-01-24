export default (sequelize, DataTypes) => {
  const AddOnServices = sequelize.define('AddOnServices', {
    accommodationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Accommodation',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    serviceName: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
  }, {});
  AddOnServices.associate = (models) => {
    // associations can be defined here
    AddOnServices.belongsTo(models.Accommodation, { foreignKey: 'accommodationId', as: 'accommodation' });
  };
  return AddOnServices;
};
