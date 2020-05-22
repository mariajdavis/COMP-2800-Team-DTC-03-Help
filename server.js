const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();
// const origin_url="https://helpservices.herokuapp.com/";
const origin_url="http://localhost:8081";
var corsOptions = {
<<<<<<< HEAD
  origin: "https://helpservices.herokuapp.com/"
};

app.use(cors(corsOptions));
function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);
=======
  origin: origin_url
};

app.use(cors(corsOptions));

// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
//     return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }
// app.use(requireHTTPS);

>>>>>>> dev
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

require("./app/routes/jobPost.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/tag.routes')(app);
<<<<<<< HEAD
require('./app/routes/jobPost.routes')(app);
=======
require('./app/routes/apply.routes')(app);
>>>>>>> dev

// The following code lets the server know to serve all 
// static React files from the build directory
app.use(express.static(path.join(__dirname, 'build')));

// Keep our client side routing functional, essentially 
// serves the index.html file on any unknown routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
