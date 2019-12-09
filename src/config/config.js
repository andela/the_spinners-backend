import { config } from 'dotenv';

config();

export const development = {
  url: process.env.DbUrl,
  dialect: 'postgres',
  logging: false
};
export const test = {
  url: process.env.DbUrl,
  dialect: 'postgres',
  logging: false
};
export const production = {
  url: process.env.DbUrl,
  dialect: 'postgres',
  logging: false
};
