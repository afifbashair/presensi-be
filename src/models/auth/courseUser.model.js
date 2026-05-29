const { DataTypes } = require("sequelize");
const authDb = require("../../config/dbAuth");

const CourseUser = authDb.define(
  "course_users",
  {
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
);

module.exports = CourseUser;