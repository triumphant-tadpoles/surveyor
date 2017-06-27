const express = require('express');
const bodyParser = require('body-parser');
const externals = require('./externals.js');

const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
var test = 'postgres://agxuzccrrsfkpa:9999dac07e4813c62f92a34e77195b59b924cb1c8289024736a827d177666fd8@ec2-54-204-32-145.compute-1.amazonaws.com:5432/daja4bvkkib521';
// const db = pgp(process.env.DATABASE_URL);
const db = pgp(test);

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
