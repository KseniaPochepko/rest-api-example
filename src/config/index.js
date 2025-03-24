import dotenv from 'dotenv';

dotenv.config();

const config = {
  server: {
    port: process.env.PORT ?? '3000',
  },
  auth: {
    secret: process.env.JWT_SECRET ?? 'super secret',
    ttl: '10d',
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME ?? 'postgres',
    port: process.env.DB_PORT ?? '5432',
    dialect: process.env.DB_DIALECT ?? 'postgres',
  },
  env: process.env.NODE_ENV ?? 'development',
};

export default config;
