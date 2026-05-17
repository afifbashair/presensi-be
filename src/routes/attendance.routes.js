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

module.exports = router;