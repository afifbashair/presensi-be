const { DataTypes } = require("sequelize");
const dbPresensi = require("../../config/dbPresensi");

const AttendanceLog = dbPresensi.define("AttendanceLog", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  attendance_id: DataTypes.INTEGER,
  status: DataTypes.STRING,
  reason: DataTypes.STRING,
});

module.exports = AttendanceLog;