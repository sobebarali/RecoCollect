import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PROD_CORS_ORIGIN: !!process.env.PROD_CORS_ORIGIN,
  DATABASE_URL: !!process.env.DATABASE_URL,
};

export default config;
