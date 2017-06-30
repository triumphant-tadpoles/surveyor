const express = require('express');
const bodyParser = require('body-parser');
const indeed = require('./externals/indeed.js');

const dbTest = require('../database-postgresql/index.js');
const multer = require('multer');
const path = require('path');
const upload = multer();
const crypto = require('crypto');
const mime = require('mime');

const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);

const docConverter = require('./externals/docconverter.js');
const watsonDiscovery = require('./externals/watsonDiscovery.js');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/temp');
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

app.use(multer({storage: storage}).any());

app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

pgp.pg.defaults.ssl = true;


app.post('/', (req, res, next) => {
  let userReq = {
    body: req.body.query,
    ip: req.headers['x-forwarded-for'],
    userAgent: req.get('user-agent')
  }
  indeed.indeed(userReq, res, next);
});

app.post('/upload', (req, res, next)=>{
  docConverter.convertDoc(req, res);
  res.send('');
});

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
});

app.get('/test', (req, res, next) => {
  watsonDiscovery();
});

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

app.post('/', (req, res, next) => {
  indeed.indeed(req, res, next);
});