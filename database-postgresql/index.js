const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);


// BELOW IS A TEST QUERY TESTING CONNECTION TO EITHER HEROKU'S OR LOCAL CONNECTION TO POSTGRES DB
module.exports.testDB = (res) => {
  db.query('SELECT * FROM users')
    .then(data => {
      console.log(data);
      res.send(data);
    });
}