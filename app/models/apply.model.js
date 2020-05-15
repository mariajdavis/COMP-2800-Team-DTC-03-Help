module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define("application", {
      jobPostID: {
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },
      resume: {
        type: Sequelize.STRING
      }
    });
  
    return Application;
  };
  