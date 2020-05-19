const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.jobPosts = require("./jobPost.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize,Sequelize);
db.orgUsers = require("./orgUser.model.js")(sequelize,Sequelize);
db.tags = require("./tag.model.js")(sequelize, Sequelize);
db.applications = require("./apply.model.js")(sequelize, Sequelize);

db.users.belongsToMany(db.jobPosts, {
  through: "users_jobPosts",
  foreignKey:"user_id",
});
db.jobPosts.belongsToMany(db.users, {
  through: "users_jobPosts",
  foreignKey:"jobPost_id"
});

db.applications.belongsTo(db.jobPosts, { foreignKey: "jobPostID" });
// db.jobPosts.hasMany(db.applications, { as: "applications" });
db.applications.belongsTo(db.users, { foreignKey: "userID" });
// db.users.hasMany(db.applications, { as: "applications" });

module.exports = db;
