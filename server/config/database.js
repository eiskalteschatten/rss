'use strict';

require('dotenv').config();

module.exports = {
  local: {
    logging: console.log
  },
  development: {
    dialectOptions: {
      ssl: true,
      decimalNumbers: true
    },
    logging: console.log
  },
  staging: {
    dialectOptions: {
      ssl: true,
      decimalNumbers: true
    },
    logging: null
  },
  production: {
    dialectOptions: {
      ssl: true,
      decimalNumbers: true
    },
    logging: null
  }
};
