const express = require('express');
const bodyParser = require('body-parser');
const indeed = require('./externals/indeed.js');
const db = require('../database-postgresql/index.js');
const multer = require('multer');

const upload = multer();
const pgp = require('pg-promise')();
pgp.pg.defaults.ssl = true;
const db = pgp(process.env.DATABASE_URL);
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;


const app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.set('port', (process.env.PORT || 5000));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


app.listen(app.get('port'), function() {
  console.log('listening on port', app.get('port'));
});


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


passport.use(new FacebookStrategy({
  clientID: '134148277165166',
  clientSecret: '3fbbeaebf4c4912f6c428292089080b9',
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos'],
},
function(accessToken, refreshToken, profile, cb) {
  return cb(null, profile);
}));



app.post('/', (req, res, next) => {
  indeed.indeed(req, res, next);
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
            res.send(result[0].marked_up_json);
          });
      })


    res.send()
  }
);


app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/results',
                                      failureRedirect: '/login' }));