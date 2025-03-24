// eslint-disable-next-line import/no-import-module-exports
import config from './index';

const supportedDialects = ['postgres', 'mariadb'];

if (!supportedDialects.includes(config.db.dialect)) {
  throw new Error(`Unsupported database dialect: ${config.db.dialect}`);
}

const dbConfig = {
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
};

export default {
  local: dbConfig,
  development: dbConfig,
  production: dbConfig,
  test: dbConfig,
};

module.exports = dbConfig;
