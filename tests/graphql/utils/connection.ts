import { Sequelize } from 'sequelize-typescript';
import Users from '../../../src/models/user';

const connection = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'olumide',
  database: 'aegis',
  logging: false,
  models: [Users],
});

export default connection;
