const db = require("../models");
const Application = db.applications;

// Create and Save an Application
exports.create = (req, res) => {
  // Validate request
  if (!req.body.resume) {
    res.status(400).send({
      message: "Must submit resume!"
    });
    return;
  }

  // Create an Application
  const application = {
    jobPostId: req.body.jobPostID,
    userID: req.body.userID,
    resume: req.body.resume
  };

  // Save JobPost in the database
  Application.create(application)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while submitting an application."
      });
    });
};

// Retrieve all applications from the database.
exports.findAll = (req, res) => {
  const jobPostID = req.query.jobPostID;
  var condition = jobPostID ? { jobPostID: jobPostID } : null;

  Application.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications."
      });
    });
};

// find all applications specific to a job post 
exports.findAllWithJobPostID = (req, res) => {
  Application.findAll({ where: { jobPostID: req.params.jobPostID } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving applications specific to a job post."
      });
    });
};

