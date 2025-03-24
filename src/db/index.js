import { Sequelize } from 'sequelize';
import config from '@core/config';
import * as models from './models';

const sequelize = new Sequelize({
  ...config.db,
  logging: false,
  underscored: true,
  timestamp: true,
  sync: false,
});

Object.values(models).forEach((Model) => {
  Model.initialize(sequelize);
});

Object.values(models).forEach((Model) => {
  Model.associate(models);
});

export { sequelize };
