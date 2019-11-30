'use strict';

const dbConfig = require('./database');

module.exports = {
  cors: {
    allowedOrigins: [
      'http://localhost:3000'
    ]
  },
  feeds: {
    cron: '0 * * * *' // once an hour at the top of the hour
  },
  dbConfig: dbConfig[process.env.NODE_ENV]
};
