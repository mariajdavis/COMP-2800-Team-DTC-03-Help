module.exports = app => {
  const jobPosts = require("../controllers/help.controller.js");

  var router = require("express").Router();

  // Create a new JobPost
  router.post("/", jobPosts.create);

  // Retrieve all JobPosts
  router.get("/", jobPosts.findAll);

  // Retrieve all jobType JobPosts
  router.get("/jobType", jobPosts.findAllJobType);

  // Retrieve a single JobPost with id
  router.get("/:id", jobPosts.findOne);

  // Update a JobPost with id
  router.put("/:id", jobPosts.update);

  // Delete a JobPost with id
  router.delete("/:id", jobPosts.delete);

  // Create a new JobPost
  router.delete("/", jobPosts.deleteAll);

  // Check if a JobPost has been saved by the user
  router.post("/saved/find", jobPosts.checkSaved);

  // Save a JobPost to User's profile
  router.post("/saved/save", jobPosts.saveHandle);

  // Retrieve all saved JobPosts from User's profile
  router.get("/saved/:id", jobPosts.findAllSaved);

  app.use('/api/jobPosts', router);
};
