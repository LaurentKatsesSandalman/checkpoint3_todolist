import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

if (!process.env.DB_PORT) {
  throw new Error('DB_PORT is not defined in .env');
}

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
