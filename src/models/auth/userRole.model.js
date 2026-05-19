const { DataTypes } = require("sequelize");
const dbAuth = require("../../config/dbAuth");

const UserRole = dbAuth.define("UserRole", {
  user_id: DataTypes.INTEGER,
  role_id: DataTypes.INTEGER,
},
{
  tableName: "userrole",
  freezeTableName: true,
});

module.exports = UserRole;