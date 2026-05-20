const { Sequelize } = require("sequelize");
require("dotenv").config();

const dbPresensi = new Sequelize(
  process.env.DB_PRESENSI_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    timezone: "+07:00",
    define: {
      freezeTableName: true,
      timestamps: true,
    },
    dialectOptions: {
      useUTC: false,
    },
  }
);

module.exports = dbPresensi;