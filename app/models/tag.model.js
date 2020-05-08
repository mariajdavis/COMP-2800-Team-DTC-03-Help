module.exports = (sequelize, Sequelize) => {
    const Tag = sequelize.define("tag", {
      jobPostID: {
        type: Sequelize.INTEGER
      },
      tag: {
        type: Sequelize.STRING
      }
    });
  
    return Tag;
  };