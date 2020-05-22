const db = require("../models");
const User = db.users;


exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.orgUserBoard = (req, res) => {
  res.status(200).send("OrgUser Content.");
};

exports.findOneUser = (req, res) => {
  User.findOne({
    where: { id: req.params.id }
  }).then(data => {
    console.log("successfully found a user")
    res.send(data);
  }).catch(e => {
    console.log("did not find user")
  })
};

exports.updateUser = (req, res) => {
  console.log(req.params.id)
  console.log(req.params.phoneNumber)
  console.log(req.params.email)
  console.log(req.params.fullName)
  User.update( {
    fullName: req.params.fullName,
    phoneNumber: req.params.phoneNumber,
    email: req.params.email
  }, { where: { id: req.params.id } 
}).then(data => {
  console.log("success: ", data);
  res.send(data);
}).catch(e => {
  console.log("did not update user")
})
};

