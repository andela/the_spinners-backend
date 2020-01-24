
export const up = (queryInterface, Sequelize) => {
  queryInterface.changeColumn(
    'Bookings',
    'accommodationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Accommodation',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  );
  queryInterface.changeColumn(
    'Rooms',
    'accommodationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Accommodation',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  );
  queryInterface.changeColumn(
    'AddOnServices',
    'accommodationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Accommodation',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  );
  queryInterface.changeColumn(
    'Amenities',
    'accommodationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Accommodation',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  );
  return queryInterface.changeColumn(
    'Bookings',
    'roomId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Rooms',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  );
};

export const down = (queryInterface, Sequelize) => {
  queryInterface.changeColumn(
    'Bookings',
    'accommodationId', {
      type: Sequelize.INTEGER
    },
  );
  queryInterface.changeColumn(
    'Rooms',
    'accommodationId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { // Room belongsTo Accommodation 1:1
        model: 'Accommodation',
        key: 'id'
      }
    },
  );
  queryInterface.changeColumn(
    'AddOnServices',
    'accommodationId', {
      type: Sequelize.INTEGER
    },
  );
  queryInterface.changeColumn(
    'Amenities',
    'accommodationId', {
      type: Sequelize.INTEGER
    },
  );
  return queryInterface.changeColumn(
    'Bookings',
    'roomId', {
      type: Sequelize.INTEGER
    },
  );
};
