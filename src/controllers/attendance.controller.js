const Attendance = require("../models/presensi/attendance.model");
const Campus = require("../models/presensi/campus.model");
const AttendanceLog = require("../models/presensi/attendanceLog.model");
const getDistance = require("../utils/distance");
const { Op } = require("sequelize");
const Course = require("../models/presensi/course.model");
const Meeting = require("../models/presensi/meeting.model");

// CHECK IN
exports.checkIn = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { campus_id, course_id, meeting_id, latitude, longitude } = req.body;

    // VALIDASI
    if (!meeting_id) {
      return res.status(400).json({ message: "Meeting wajib dipilih" });
    }

    // CEK SUDAH ABSEN
    const existing = await Attendance.findOne({
      where: { user_id, meeting_id },
    });

    if (existing) {
      return res.status(400).json({
        message: "Sudah absen di pertemuan ini",
      });
    }

    // AMBIL DATA KAMPUS
    const campus = await Campus.findByPk(campus_id);

    if (!campus) {
      return res.status(404).json({ message: "Kampus tidak ditemukan" });
    }

    // HITUNG JARAK
    const distance = getDistance(
      latitude,
      longitude,
      campus.latitude,
      campus.longitude
    );

    // // VALIDASI RADIUS
    if (distance > campus.radius) {
      return res.status(400).json({
        message: `Diluar jangkauan (${Math.round(distance)} meter)`,
      });
    }

    if (!meeting) {
      return res.status(404).json({ message: "Meeting tidak ditemukan" });
    }

    const meeting = await Meeting.findByPk(meeting_id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting tidak ditemukan" });
    }

    const now = new Date();

    if (now < meeting.start_time) {
      return res.status(400).json({
        message: "Presensi belum dibuka",
      });
    }

    if (now > meeting.end_time) {
      return res.status(400).json({
        message: "Presensi sudah ditutup",
      });
    }

    // SIMPAN
    await Attendance.create({
      user_id,
      campus_id,
      course_id,
      meeting_id,
      check_in_time: new Date(),
      latitude,
      longitude,
    });

    // RESPONSE
    return res.json({
      message: "Presensi berhasil",
      distance: Math.round(distance),
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.getMyAttendance = async (req, res) => {
  try {
    const user_id = req.user.id;

    const data = await Attendance.findAll({
      where: { user_id },
      order: [["check_in_time", "DESC"]],
    });

    const enriched = await Promise.all(
      data.map(async (item) => {
        const campus = await Campus.findByPk(item.campus_id);
        const course = await Course.findByPk(item.course_id);
        const meeting = await Meeting.findByPk(item.meeting_id);

        return {
          ...item.toJSON(),
          campus_name: campus ? campus.name : null,
          course_name: course ? course.name : null,
          meeting_name: meeting ? meeting.title : null,
        };
      })
    );

    res.json({
      total: enriched.length,
      data: enriched,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllAttendance = async (req, res) => {
  try {
    const data = await Attendance.findAll({
      order: [["check_in_time", "DESC"]],
    });

    const enriched = await Promise.all(
      data.map(async (item) => {
        const campus = await Campus.findByPk(item.campus_id);
        const course = await Course.findByPk(item.course_id);
        const meeting = await Meeting.findByPk(item.meeting_id);

        return {
          ...item.toJSON(),
          campus_name: campus ? campus.name : null,
          course_name: course ? course.name : null,
          meeting_name: meeting ? meeting.title : null,
        };
      })
    );

    res.json({
      total: enriched.length,
      data: enriched,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// const { Op } = require("sequelize");

exports.getAttendanceByDate = async (req, res) => {
  try {
    const { start, end } = req.query;
    const { Op } = require("sequelize");

    const data = await Attendance.findAll({
      where: {
        check_in_time: {
          [Op.between]: [new Date(start), new Date(end)],
        },
      },
      order: [["check_in_time", "DESC"]],
    });

    const enriched = await Promise.all(
      data.map(async (item) => {
        const campus = await Campus.findByPk(item.campus_id);
        const course = await Course.findByPk(item.course_id);
        const meeting = await Meeting.findByPk(item.meeting_id);

        return {
          ...item.toJSON(),
          campus_name: campus ? campus.name : null,
          course_name: course ? course.name : null,
          meeting_name: meeting ? meeting.title : null,
        };
      })
    );

    res.json({
      total: enriched.length,
      data: enriched,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTodayAttendance = async (req, res) => {
  try {
    const { Op } = require("sequelize");

    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const data = await Attendance.findAll({
      where: {
        check_in_time: {
          [Op.between]: [start, end],
        },
      },
      order: [["check_in_time", "DESC"]],
    });

    const enriched = await Promise.all(
      data.map(async (item) => {
        const campus = await Campus.findByPk(item.campus_id);
        const course = await Course.findByPk(item.course_id);
        const meeting = await Meeting.findByPk(item.meeting_id);

        return {
          ...item.toJSON(),
          campus_name: campus ? campus.name : null,
          course_name: course ? course.name : null,
          meeting_name: meeting ? meeting.title : null,
        };
      })
    );

    res.json({
      total: enriched.length,
      data: enriched,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};