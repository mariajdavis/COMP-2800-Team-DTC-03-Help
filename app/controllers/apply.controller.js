const db = require("../models");
const Application = db.applications;
const JobPost = db.jobPosts;
const User = db.users;

// Create and Save an Application
exports.create = (req, res) => {

  // Validate request
  if (!req.body.resumePath) {
    res.status(400).send({
      message: "Must submit resume!"
    });
    return;
  }

  // Create an Application
  const application = {
    jobPostID: req.body.jobPostID,
    userID: req.body.userID,
    status: "pending",
    resumePath: req.body.resumePath,
    comments: req.body.comments
  };

  console.log(application);

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

// Find all applications specific to an organization
exports.findAllOrgApplicants = (req, res) => {
  Application.findAll({
    include: [{
      model: JobPost,
      // required: true,
      where: { orgID: req.params.orgID }
    },
    {
      model: User
    }]
  }).then(data => {
    res.send(data);
  })
};

exports.updateStatus = (req, res) => {
  Application.findOne({
    where: { id: req.params.applicationID }
  }).then(application => {
    // Check if application (id) exists
    if (application) {
      application.update({
        status: req.params.newStatus
      })
    }
  })
};

// // find all applications specific to a job post 
// exports.findAllWithJobPostID = (req, res) => {
//   Application.findAll({ where: { jobPostID: req.params.jobPostID } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving applications specific to a job post."
//       });
//     });
// };

