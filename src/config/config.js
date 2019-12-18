import { config } from 'dotenv';

config();

export const development = {
  url: process.env.DB_URL,
  dialect: 'postgres',
  logging: false
};
export const test = {
  url: process.env.DB_URL,
  dialect: 'postgres',
  logging: false
};
export const production = {
  url: process.env.DB_URL,
  dialect: 'postgres',
  logging: false
};
