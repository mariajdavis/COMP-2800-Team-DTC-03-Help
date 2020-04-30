var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
user:'maria',
password:'mariapassword',
database:'help'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// Adds user to db
app.post('/userAdded', function(req) {
  var sql = `INSERT INTO users (email, password, name)`
  + `VALUES ('${req.body.email}', '${req.body.password}', '${req.body.name}')`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("User added");
  });
});

// Logs user in if email/password match
app.get('/login', function(req, res) {
  console.log(req.query.email);
  console.log(req.query.password);
  var sql = `SELECT * FROM users WHERE email = '${req.query.email}' ` 
  + `AND password = '${req.query.password}'`;
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if (!result.length) { // If that user email/password combo doesn't exist in db
      console.log("Log in failed");
    }
    else {
      res.render('homepage', {title: 'Homepage', userData: result})
      console.log("Log in successful");
    }
  });
});

require('./routes/html-routes')(app, connection);

module.exports = app;
