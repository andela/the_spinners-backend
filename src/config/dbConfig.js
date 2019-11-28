import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export default new Sequelize(process.env.DB_URL);
