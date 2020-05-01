module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", users.create);
  
    // Create a new OrgUser
    router.post("/", users.orgCreate);
  
    // Checks if a User exists
    router.get("/", users.findUser);

    app.use('/api/users', router);
  };
  