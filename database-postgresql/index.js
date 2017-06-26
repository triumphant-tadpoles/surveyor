var pg = require('pg');
// var config = require('../config.js');
// 'process.env.DATABASE_URL' is avaialable in Heroku's environment, otherwise, obtain postgresUrl from this project's DB account.
// var postgresUrl = (process.env.DATABASE_URL || config.postgresUrl);
var postgresUrl = (process.env.DATABASE_URL);


// REFER TO https://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
// ALSO, https://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
// ADDING 'pg.defaults.ssl = true;' IS IMPORTANT, OTHERWISE THERE WILL BE AN ERROR IN CONNECTION TO DB!!!

pg.defaults.ssl = true;
module.exports = {
  query: function(text, cb) {
    pg.connect(postgresUrl, function(error, client) {
      if (error) {
        throw error;
      }
      client
        .query(text)
        .then(results => {
          cb(results);
        });
    });
  }
};