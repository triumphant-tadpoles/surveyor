var express = require('express');
var bodyParser = require('body-parser');
var pg = require('../database-postgresql');

var app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});

// BELOW IS A TEST QUERY TESTING CONNECTION TO THIS PROJECT'S HEROKU POSTGRES
pg.query(`SELECT * FROM beverages`, function(results) {
  console.log('TESTING DB CONNECTION:', results.rows);
});