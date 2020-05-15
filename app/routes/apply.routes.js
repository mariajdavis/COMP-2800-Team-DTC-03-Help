module.exports = app => {
  const Application = require("../controllers/apply.controller.js");

  var router = require("express").Router();

  // Create a new Application
  router.post("/", Application.create);

  // Retrieve all Applications
  router.get("/", Application.findAll);

  // Retrieve all Applications for a specific jobPost ID
  router.get("/specificJobPost", Application.findAllWithJobPostID);

  app.use('/api/applications', router);
};