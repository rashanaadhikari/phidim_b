import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { env } from '../helpers/constants.js';
dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, NODE_ENV } = env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: false,
    freezeTableName: false,
    timestamps: true,
  },
});

export default sequelize;
export { Sequelize };