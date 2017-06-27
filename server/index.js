const express = require('express');
const bodyParser = require('body-parser');
const externals = require('./externals.js');

const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

const app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

app.get('/testdb', (req, res) => {
  const allUsers = [];
  db.query('SELECT * FROM users')
    .then(data => {
      data.forEach(user => {
        allUsers.push(user.username);
      })
    })
    .then(() => {
      res.send(allUsers);    
    });
});

app.post('/', (req, res, next) => {
  console.log(req.ip);
  externals.indeed(req, res, next);
});

// BELOW IS A TEST QUERY TESTING CONNECTION TO EITHER HEROKU'S OR LOCAL CONNECTION TO POSTGRES DB
// db.query('SELECT * FROM users')
//   .then(data => {
//     console.log(data);
//   });
