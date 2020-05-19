module.exports = app => {
  const Application = require("../controllers/apply.controller.js");

  var router = require("express").Router();

  // Create a new Application
  router.post("/", Application.create);

  // Retrieve all Applicants for a specific organization
  router.get("/:orgID", Application.findAllOrgApplicants);

  // Update status of an application
  router.put("/:applicationID/:newStatus", Application.updateStatus);

  // // Retrieve all Applications
  // router.get("/", Application.findAll);

  // // Retrieve all Applications for a specific jobPost ID
  // router.get("/specificJobPost", Application.findAllWithJobPostID);

  app.use('/api/applications', router);
};