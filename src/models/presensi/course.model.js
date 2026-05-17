const { DataTypes } = require("sequelize");
const dbPresensi = require("../../config/dbPresensi");

const Course = dbPresensi.define("Course", {
  name: DataTypes.STRING,
});

module.exports = Course;