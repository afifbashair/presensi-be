const { DataTypes } = require("sequelize");
const dbAuth = require("../../config/dbAuth");

const Session = dbAuth.define("Session", {
  user_id: DataTypes.INTEGER,
  token: DataTypes.TEXT,
});

module.exports = Session;