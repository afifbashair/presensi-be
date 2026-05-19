const { DataTypes } = require("sequelize");
const dbAuth = require("../../config/dbAuth");

const User = dbAuth.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
  },
  {
    tableName: "users",
    freezeTableName: true,
  }
);

module.exports = User;