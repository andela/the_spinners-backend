
export const up = (queryInterface, Sequelize) => queryInterface.changeColumn(
  'Images',
  'subjectId', {
    allowNull: false,
    type: Sequelize.INTEGER
  }
);

export const down = (queryInterface, Sequelize) => queryInterface.changeColumn(
  'Images',
  'subjectId', {
    type: Sequelize.INTEGER
  }
);
