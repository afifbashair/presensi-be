const { DataTypes } = require("sequelize");
const dbPresensi = require("../../config/dbPresensi");

const Meeting = dbPresensi.define("Meeting", {
  course_id: DataTypes.INTEGER,
  title: DataTypes.STRING,
  date: DataTypes.DATE,
  type: DataTypes.STRING,
  content: DataTypes.TEXT,
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
});

module.exports = Meeting;