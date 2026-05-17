const Course = require("../models/presensi/course.model");
const Meeting = require("../models/presensi/meeting.model");
const Attendance = require("../models/presensi/attendance.model");

// Course - Meeting
Course.hasMany(Meeting, { foreignKey: "course_id" });
Meeting.belongsTo(Course, { foreignKey: "course_id" });

// Course - Attendance
Course.hasMany(Attendance, { foreignKey: "course_id" });
Attendance.belongsTo(Course, { foreignKey: "course_id" });

// Meeting - Attendance
Meeting.hasMany(Attendance, { foreignKey: "meeting_id" });
Attendance.belongsTo(Meeting, { foreignKey: "meeting_id" });