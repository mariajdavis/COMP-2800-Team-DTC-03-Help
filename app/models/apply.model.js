module.exports = (sequelize, Sequelize) => {
    const Application = sequelize.define("application", {
      resumePath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type:   Sequelize.ENUM,
        values: ['pending', 'rejected', 'accepted']
      }
    });
    return Application;
  };