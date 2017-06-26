var pg = require('pg');

// REFER TO https://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module
// ALSO, https://stackoverflow.com/questions/8484404/what-is-the-proper-way-to-use-the-node-js-postgresql-module

// ADDING 'pg.defaults.ssl = true;' IS IMPORTANT, OTHERWISE THERE WILL BE AN ERROR IN CONNECTION TO DB
  // BUT WHEN TESTING DURING DEV AND USING LOCAL DB, COMMENT IT OUT

// pg.defaults.ssl = true;
module.exports = {
  query: function(text, cb) {
    pg.connect(process.env.DATABASE_URL, function(error, client) {
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