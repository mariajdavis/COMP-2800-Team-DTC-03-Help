module.exports = {
  HOST: "localhost",
  USER: "maria",
  PASSWORD: "mariapassword",
  DB: "help_app",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
