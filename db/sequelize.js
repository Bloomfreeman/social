const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "social_api",
  "postgres",
  "0000",
  {
    host: "localhost",
    dialect: "postgres",
    logging: false
  }
);

module.exports = sequelize;
