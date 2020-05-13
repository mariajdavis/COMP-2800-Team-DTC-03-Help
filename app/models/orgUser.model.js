<<<<<<< HEAD
module.exports = (sequelize, Sequelize) => {
    const orgUser = sequelize.define("orgUser", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return orgUser;
  };
=======
module.exports = (sequelize, Sequelize) => {
    const orgUser = sequelize.define("orgUser", {
      username: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return orgUser;
  };
>>>>>>> Gonu_Kim_v3
  