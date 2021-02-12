/**
 * DB configurations.
 */
module.exports = {
  HOST: "sql3.freemysqlhosting.net",
  USER: "sql3392432",
  PASSWORD: "JA4XsFUcuM",
  DB: "sql3392432",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

