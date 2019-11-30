'use strict';

require('dotenv').config();

const shared = {
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'postgres'
};

module.exports = {
  development: {
    ...shared,
    dialectOptions: {
      ssl: false,
      decimalNumbers: true
    },
    logging: console.log
  },
  staging: {
    ...shared,
    dialectOptions: {
      ssl: true,
      decimalNumbers: true
    },
    logging: null
  },
  production: {
    ...shared,
    dialectOptions: {
      ssl: true,
      decimalNumbers: true
    },
    logging: null
  }
};
