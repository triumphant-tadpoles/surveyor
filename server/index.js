const express = require('express');
const bodyParser = require('body-parser');


const pg = require('pg');
const pgp = require('pg-promise')();
// pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);


const app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

// BELOW IS A TEST QUERY TESTING CONNECTION TO EITHER HEROKU'S OR LOCAL CONNECTION TO POSTGRES DB
db.query('SELECT * FROM users')
  .then(data => {
    console.log(data);
  });