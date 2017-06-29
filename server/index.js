const express = require('express');
const bodyParser = require('body-parser');
const indeed = require('./externals/indeed.js');
const dbTest = require('../database-postgresql/index.js');
const multer = require('multer');
const upload = multer();
const pgp = require('pg-promise')();
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const watsonDiscovery = require('./externals/watsonDiscovery.js');


const app = express();

app.use(function(req, res, next) {
res.header('Access-Control-Allow-Credentials', true);
res.header('Access-Control-Allow-Origin', req.headers.origin);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
if ('OPTIONS' == req.method) {
     res.send(200);
 } else {
     next();
 }
});
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);
app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/', (req, res, next) => {
  let userReq = {
    body: req.body.query,
    ip: req.headers['x-forwarded-for'],
    userAgent: req.get('user-agent')
  }
  console.log(req.body, req.headers['x-forwarded-for'], req.get('user-agent'));
  indeed.indeed(userReq, res, next);
});

<<<<<<< HEAD
app.post('/gethistory', (req, res) => {
  db.query(`SELECT * FROM users WHERE facebook_id = '${req.body.id}'`)
    .then(result => {
      return result[0].id;
    })
    .then(user_id => {
      db.query(`SELECT marked_up_json FROM resumes WHERE user_id = '${user_id}'`)
        .then(result => {
          res.send(result[0].marked_up_json);
        });
    });
|
app.get('/test', (req, res, next) => {
  watsonDiscovery();
});

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

app.post('/', (req, res, next) => {
  indeed.indeed(req, res, next);
});