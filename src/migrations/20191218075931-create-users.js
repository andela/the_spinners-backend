/**
 * @exports
 * @class
 * @param {object} queryInterface
 * @param {object} Sequelize
 */
export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    preferredLanguage: {
      type: Sequelize.STRING,
      defaultValue: 'english'
    },
    preferredCurrency: {
      type: Sequelize.STRING,
      defaultValue: 'Dollar'
    },
    residence: {
      type: Sequelize.STRING,
      allowNull: true
    },
    department: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lineManager: {
      type: Sequelize.STRING,
      allowNull: true
    },
    role: {
      type: Sequelize.ENUM('super_admin', 'travel_admin', 'travel_team_member', 'manager', 'requester'),
      defaultValue: 'requester',
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    token: {
      allowNull: true,
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
}
/**
 * @exports
 * @class
 * @param {object} queryInterface
 */
export function down(queryInterface) { return queryInterface.dropTable('Users'); }
