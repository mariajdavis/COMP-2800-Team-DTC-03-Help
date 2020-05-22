/**
 * DB configurations.
 */
module.exports = {
  HOST: "sql3.freemysqlhosting.net",
  USER: "sql3342675",
  PASSWORD: "G7V8wuNWbY",
  DB: "sql3342675",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

