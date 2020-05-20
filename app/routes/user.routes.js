const { authJwt } = require("../middleware");

module.exports = function(app) {

  const controller = require("../controllers/user.controller");
  var router = require("express").Router();
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  router.get("/:id", controller.findOneUser);

  router.put("/:id/:phoneNumber/:email/:fullName", controller.updateUser);

  app.use('/api/users', router);

};