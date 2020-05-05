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

