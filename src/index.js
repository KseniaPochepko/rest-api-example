import app from './app';
import config from './config';
import { sequelize } from './db';

(async function main() {
  await sequelize.authenticate();
  console.log('Database connected');

  app.listen(config.server.port, () => {
    console.log(`Server is listening on port ${config.server.port}`);
  });
})();
