'use strict';

const dbConfig = require('./database');

module.exports = {
  cors: {
    allowedOrigins: [
      'http://localhost:3000'
    ]
  },
  dbConfig: dbConfig[process.env.NODE_ENV]
};
