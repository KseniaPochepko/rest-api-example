import config from './index';

const dbConfig = {
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  port: config.db.port,
  dialect: 'postgres',
};

export default {
  local: dbConfig,
  development: dbConfig,
  production: dbConfig,
  test: dbConfig,
};

module.exports = dbConfig;
