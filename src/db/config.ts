import { Sequelize } from 'sequelize-typescript';
import config from '../config';
import Users from '../models/user';

const connection = new Sequelize({
  dialect: 'postgres',
  host: config.dbHost,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  logging: false,
  models: [Users],
});

export default connection;
