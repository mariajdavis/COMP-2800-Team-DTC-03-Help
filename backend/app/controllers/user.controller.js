const db = require("../models");
const User = db.users;
const OrgUser = db.dbUsers;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Create and Save a new OrgUser
exports.orgCreate = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create an OrgUser
    const orgUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    };
  
    // Save User in the database
    OrgUser.create(orgUser)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
    });
};

exports.findUser = (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    User.findOne({where:{username: req.params.username}}).then(data=>{
        if (data.params.password==req.params.password){
            res.send(1);
        }
    })
    .catch(err => {
        res.status(500).send({
            message:err.message || "Some error occurred while retrieving User."
        });
    });
}