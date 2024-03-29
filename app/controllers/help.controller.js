const db = require("../models");
const JobPost = db.jobPosts;
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new JobPost
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
    return;
  }

  // Create a JobPost
  const jobPost = {
    title: req.body.title,
    description: req.body.description,
    jobType: req.body.jobType,
    rate: req.body.rate,
    contractLength: req.body.contractLength,
    startDate: req.body.startDate,
    orgID: req.body.orgID,
    lat: req.body.lat,
    lng: req.body.lng,
    location: req.body.location
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

// add a job post to a user's saved job list
exports.saveHandle = (req, res) => {
  return JobPost.findByPk(req.body.jobPostId)
    .then((jobPost) => {
      if (!jobPost) {
        console.log("JobPost not found!");
        return null;
      }
      return User.findByPk(req.body.userId).then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }
        if (req.body.save) {
          jobPost.addUser(user);
        }
        else {
          jobPost.removeUser(user);
        }
        return user;
      });
    })
    .catch((err) => {
      console.log(">> Error while adding User to JobPost: ", err);
    });
};


// Check if a job is saved by the user
exports.checkSaved = (req, res) => {
  JobPost.findOne({
    where: { id: req.body.jobPostId },
    include: [{
     model: User,
     through: 'users_jobPosts',
     where: { id: req.body.userId },
    }]
   }).then(data=>{
    if (data) {
      res.send({found:true})
    }
    else {
      res.send({found:false})
    }
   })
}


// Retrieve all saved JobPosts for a user
exports.findAllSaved = (req, res) => {
  JobPost.findAll({
    include: [{
      model: User,
      through: 'users_jobPosts',
      where: { id: req.params.id },
    }]
  }).then(data => {
    res.send(data);
  })
};