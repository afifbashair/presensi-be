const { DataTypes } = require("sequelize");

const sequelize = require("../../config/dbPresensi");

const Course = sequelize.define(
  "Course",
  {
    name: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.TEXT,
    },

    thumbnail: {
      type: DataTypes.TEXT,
    },

    teacher_name: {
      type: DataTypes.STRING,
    },
  }
);

module.exports = Course;