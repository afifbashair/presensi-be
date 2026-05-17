const { DataTypes } = require("sequelize");
const dbAuth = require("../../config/dbAuth");

const UserRole = dbAuth.define("UserRole", {
  user_id: DataTypes.INTEGER,
  role_id: DataTypes.INTEGER,
});

module.exports = UserRole;