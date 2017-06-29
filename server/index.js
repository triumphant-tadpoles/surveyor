const express = require('express');
const bodyParser = require('body-parser');
const indeed = require('./externals/indeed.js');
const dbTest = require('../database-postgresql/index.js');
const multer = require('multer');
const upload = multer();

const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

const app = express();
const db = pgp(process.env.DATABASE_URL);
app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

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

app.get('/results', require('connect-ensure-login').ensureLoggedIn(),
  (req, res) => {
    db.query(`SELECT * FROM users WHERE facebook_id = '${req.user.id}'`)
      .then(result => {
        return result[0].id;
      })
      .then(user_id => {
        db.query(`SELECT marked_up_json FROM resumes WHERE user_id = '${user_id}'`)
          .then(result => {
            //call indeed with prev query
            //res.send results
            //set up app.get '/'
            
            res.send(result[0].marked_up_json);
          });
      })

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

app.post('/', (req, res, next) => {
  indeed.indeed(req, res, next);
});