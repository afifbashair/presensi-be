const router = require("express").Router();
const attendance = require("../controllers/attendance.controller");
const auth = require("../middlewares/auth.middleware");

// checkin
router.post("/checkin", auth, attendance.checkIn);

// riwayat
router.get("/", auth, attendance.getAllAttendance);
router.get("/me", auth, attendance.getMyAttendance);
router.get("/today", auth, attendance.getTodayAttendance);
router.get("/filter", auth, attendance.getAttendanceByDate);
router.get("/meeting/:meeting_id", auth, attendance.getAttendanceByMeeting);
router.get("/course/:course_id", auth, attendance.getAttendanceSummaryByCourse);
router.get("/meeting/:meeting_id/present", auth, attendance.getPresentStudents);
router.get("/meeting/:meeting_id/absent", auth, attendance.getAbsentStudents);
router.get("/meeting/:meeting_id/export", auth, attendance.exportAttendance);
router.get("/meeting/:meeting_id/summary", auth, attendance.getMeetingSummary);

module.exports = router; 