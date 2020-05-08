module.exports = (sequelize, Sequelize) => {
  const JobPost = sequelize.define("jobPost", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    jobType: {
      type: Sequelize.STRING
    },
    rate: {
      type: Sequelize.STRING
    },
    contractLength: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.STRING
    },
    orgID: {
      type: Sequelize.INTEGER
    }
  });

  return JobPost;
};
