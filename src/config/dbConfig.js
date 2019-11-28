<<<<<<< HEAD
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
=======
import Sequelize from "sequelize";
import dotenv from "dotenv";
>>>>>>> Chore(setup): Setup postgresql and sequelize

dotenv.config();

export default new Sequelize(process.env.DB_URL);
