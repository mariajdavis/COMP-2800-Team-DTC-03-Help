var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

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

// Creates database
app.get('/createDatabase', function(req, res) {
  let sql = "CREATE DATABASE IF NOT EXISTS help;";
  connection.query(sql, function(err) {
    if(err) throw err;
    console.log("Database created");
  });
});

// Creates table of users
app.get('/createTable', function(req, res) {
  let sql = 'CREATE TABLE IF NOT EXISTS users('
  + 'id INT AUTO_INCREMENT NOT NULL,'
  + 'email VARCHAR(255) NOT NULL,'
  + 'password VARCHAR(255) NOT NULL,'
  + 'name VARCHAR(255) NOT NULL,'
  + 'PRIMARY KEY (id));'
  connection.query(sql, function (err) {
      if (err) throw err;
      console.log("Table created");
    });
});

// Add user to db
app.post('/userAdded', function(req) {
  var sql = `INSERT INTO users (email, password, name) 
  VALUES ('${req.body.email}', ${req.body.password}, '${req.body.name}')`;
  connection.query(sql, function (err) {
    if (err) throw err;
    console.log("User added");
  });
});

require('./routes/html-routes')(app, connection);

module.exports = app;


