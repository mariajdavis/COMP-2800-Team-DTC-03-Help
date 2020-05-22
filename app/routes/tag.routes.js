/**
 * Routes for tag related tasks.
 */
module.exports = app => {
  const tags = require("../controllers/tag.controller.js");

  var router = require("express").Router();

  // Create a new tag
  router.post("/", tags.create);

  // // Retrieve all tags
  // router.get("/", tags.findAll);

  app.use('/api/tags', router);
};
