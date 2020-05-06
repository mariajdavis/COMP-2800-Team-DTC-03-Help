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
    }
  });

  return JobPost;
};
