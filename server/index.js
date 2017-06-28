const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const indeed = require('./externals/indeed.js');
const db = require('../database-postgresql/index.js');


const app = express();
const upload = multer();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/../react-client/dist'));

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

app.get('/testDB', (req, res, next) => {
  db.testDB(res);
});

app.post('/', (req, res, next) => {
  indeed.indeed(req, res, next);
});

app.post('/resume/jobs',  upload.single('file'), (req, res) => {
  console.log('inside /resume/jobs');
  console.log('file:', req.file);
})