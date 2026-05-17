const { DataTypes } = require("sequelize");
const dbAuth = require("../../config/dbAuth");

const UserProfile = dbAuth.define("UserProfile", {
  user_id: DataTypes.INTEGER,
  fullname: DataTypes.STRING,
  nim: DataTypes.STRING,
  prodi: DataTypes.STRING,
});

module.exports = UserProfile;