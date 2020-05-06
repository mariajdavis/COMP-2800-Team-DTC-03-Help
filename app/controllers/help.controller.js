const db = require("../models");
const JobPost = db.jobPosts;
const Op = db.Sequelize.Op;

// Create and Save a new JobPost
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a JobPost
  const jobPost = {
    title: req.body.title,
    description: req.body.description,
    jobType: req.body.jobType
  };

  // Save JobPost in the database
  JobPost.create(jobPost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the JobPost."
      });
    });
};

// Retrieve all JobPosts from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  JobPost.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobPosts."
      });
    });
};

// Find a single JobPost with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  JobPost.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving JobPost with id=" + id
      });
    });
};

// Update a JobPost by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  JobPost.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "JobPost was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update JobPost with id=${id}. Maybe JobPost was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating JobPost with id=" + id
      });
    });
};

// Delete a JobPost with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  JobPost.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "JobPost was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete JobPost with id=${id}. Maybe JobPost was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete JobPost with id=" + id
      });
    });
};

// Delete all JobPosts from the database.
exports.deleteAll = (req, res) => {
  JobPost.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} JobPosts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all jobPosts."
      });
    });
};

// find all jobType JobPost
exports.findAllJobType = (req, res) => {
  JobPost.findAll({ where: { jobType: req.params.jobType } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobPosts."
      });
    });
};
