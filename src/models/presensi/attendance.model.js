const { DataTypes } = require("sequelize");
const dbPresensi = require("../../config/dbPresensi");

const Attendance = dbPresensi.define("Attendance", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  campus_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  check_in_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  latitude: DataTypes.DOUBLE,
  longitude: DataTypes.DOUBLE,
  course_id: DataTypes.INTEGER,
  meeting_id: DataTypes.INTEGER,
});

module.exports = Attendance;