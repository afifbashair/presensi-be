const { DataTypes } = require("sequelize");
const dbAuth = require("../../config/dbAuth");

const Role = dbAuth.define("Role", {
  name: DataTypes.STRING,
});

module.exports = Role;