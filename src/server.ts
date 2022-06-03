import 'reflect-metadata';
require('dotenv').config();
import App from 'app';
import { BaseController } from 'routes/controllers/base-controller';
import { UserController } from 'routes/controllers/user.controller';
import { DataSource } from 'typeorm';
import { CompanyEntity, OrderEntity, UserEntity } from 'models';
import { OrderController } from 'routes/controllers/order.controller';
import { AnalyticController } from 'routes/controllers/analytics.controller';

function getDBConfig(): any {
  const dev = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [CompanyEntity, UserEntity, OrderEntity],
    synchronize: true,
    logging: ['error', 'schema'],
    logger: 'advanced-console'
  };

  const prod = {
    type: 'mysql',
    host: process.env.DB_HOST_PROD,
    port: Number(process.env.DB_PORT_PROD),
    username: process.env.DB_USER_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    entities: [CompanyEntity, UserEntity, OrderEntity],
    synchronize: false,
    logging: ['error', 'schema'],
    logger: 'advanced-console'
  };

  return process.env.NODE_ENV === 'production' ? prod : dev;
}

const appDataSource: DataSource = new DataSource(getDBConfig());
appDataSource
  .initialize()
  .then(() => {
    const controllers: Array<BaseController> = [new UserController(), new OrderController(), new AnalyticController()];
    const app = new App(controllers, Number(process.env.NODE_PORT));

    app.listen();
  })
  .catch((error) => console.error(error));
