module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "gukim0716",
  DB: "help_app",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

