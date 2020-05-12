const db = require("../models");
const Tag = db.tags;
const Op = db.Sequelize.Op;

// Create and Save a new Tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body.tag) {
    res.status(400).send({
      message: "Must submit a tag!"
    });
    return;
  }

  // Create a Tag
  const aTag = {
    jobPostID: req.body.jobPostID,
    tag: req.body.tag,
  };

  // Save Tag in the database
  Tag.create(aTag)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tag."
      });
    });
};

// Retrieve all tags from the database.
// exports.findAll = (req, res) => {
//   const tag = req.query.tag;
//   var condition = tag ? { tag: { [Op.like]: `%${tag}%` } } : null;

//   Tag.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tags."
//       });
//     });
// };
