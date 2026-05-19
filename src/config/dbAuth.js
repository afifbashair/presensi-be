const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbAuth = new Sequelize(
  process.env.DB_AUTH_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: true,
    },
  }
);

module.exports = dbAuth;