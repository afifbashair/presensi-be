const Attendance = require("../models/presensi/attendance.model");
const Campus = require("../models/presensi/campus.model");
const AttendanceLog = require("../models/presensi/attendanceLog.model");
const getDistance = require("../utils/distance");
const { Op } = require("sequelize");
const Course = require("../models/presensi/course.model");
const Meeting = require("../models/presensi/meeting.model");
const User = require("../models/auth/user.model");
const CourseUser = require("../models/auth/courseUser.model");
const ExcelJS = require("exceljs");

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


exports.getAttendanceByMeeting =
  async (req, res) => {

    try {

      const { meeting_id } =
        req.params;

      const meeting =
        await Meeting.findByPk(
          meeting_id
        );

      if (!meeting) {
        return res
          .status(404)
          .json({
            message:
              "Meeting tidak ditemukan",
          });
      }

      const attendances =
        await Attendance.findAll({
          where: {
            meeting_id,
          },
        });

      const students =
        await Promise.all(
          attendances.map(
            async (a) => {

              const user =
                await User.findByPk(
                  a.user_id
                );

              return {
                user_id:
                  user.id,

                email:
                  user.email,

                check_in_time:
                  a.check_in_time,
              };
            }
          )
        );

      res.json({
        meeting,
        total:
          students.length,
        students,
      });

    } catch (err) {

      res.status(500).json({
        message:
          err.message,
      });
    }
  };

  exports.getAttendanceSummaryByCourse =
async (req,res)=>{

  const { course_id } =
    req.params;

  const meetings =
    await Meeting.findAll({
      where:{
        course_id
      }
    });

  const result = [];

  for(const meeting of meetings){

    const total =
      await Attendance.count({
        where:{
          meeting_id:
            meeting.id
        }
      });

    result.push({
      meeting_id:
        meeting.id,

      meeting_name:
        meeting.title,

      total_attendance:
        total,
    });
  }

  res.json(result);
};

// sudah hadir
exports.getPresentStudents =
async (req,res)=>{

  try{

    const { meeting_id } =
      req.params;

    const attendances =
      await Attendance.findAll({
        where:{
          meeting_id
        }
      });

    const students =
      await Promise.all(
        attendances.map(
          async(a)=>{

            const user =
              await User.findByPk(
                a.user_id
              );

            return{
              id:user.id,
              email:user.email,
              check_in_time:
                a.check_in_time
            };
          }
        )
      );

    res.json({
      total:
        students.length,
      students
    });

  }catch(err){

    res.status(500).json({
      message:
        err.message
    });

  }
};

exports.getAbsentStudents =
async (req,res)=>{

  try{

    const { meeting_id } =
      req.params;

    const meeting =
      await Meeting.findByPk(
        meeting_id
      );

    if(!meeting){

      return res
        .status(404)
        .json({
          message:
            "Meeting tidak ditemukan"
        });

    }

    const participants =
      await CourseUser.findAll({
        where:{
          course_id:
            meeting.course_id
        }
      });

    const attendances =
      await Attendance.findAll({
        where:{
          meeting_id
        }
      });

    const attendedIds =
      attendances.map(
        a=>a.user_id
      );

    const absentParticipants =
      participants.filter(
        p =>
          !attendedIds.includes(
            p.user_id
          )
      );

    const students =
      await Promise.all(
        absentParticipants.map(
          async(p)=>{

            const user =
              await User.findByPk(
                p.user_id
              );

            return{
              id:user.id,
              email:user.email
            };

          }
        )
      );

    res.json({
      total:
        students.length,
      students
    });

  }catch(err){

    res.status(500).json({
      message:
        err.message
    });

  }
};

exports.getMeetingSummary =
async (req,res)=>{

  try{

    const { meeting_id } =
      req.params;

    const meeting =
      await Meeting.findByPk(
        meeting_id
      );

    const totalParticipant =
      await CourseUser.count({
        where:{
          course_id:
            meeting.course_id
        }
      });

    const totalPresent =
      await Attendance.count({
        where:{
          meeting_id
        }
      });

    const percentage =
      totalParticipant === 0
      ? 0
      : (
          totalPresent /
          totalParticipant
        ) * 100;

    res.json({

      total_participant:
        totalParticipant,

      total_present:
        totalPresent,

      total_absent:
        totalParticipant -
        totalPresent,

      attendance_percentage:
        percentage.toFixed(2)

    });

  }catch(err){

    res.status(500).json({
      message:
        err.message
    });

  }
};

exports.exportAttendance = async (req, res) => {
  try {
    const { meeting_id } = req.params;

    const meeting =
      await Meeting.findByPk(meeting_id);

    if (!meeting) {
      return res.status(404).json({
        message: "Meeting tidak ditemukan",
      });
    }

    const participants =
      await CourseUser.findAll({
        where: {
          course_id: meeting.course_id,
        },
      });

    const attendances =
      await Attendance.findAll({
        where: {
          meeting_id,
        },
      });

    const attendedIds =
      attendances.map(
        (a) => a.user_id
      );

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        "Rekap Presensi"
      );

    worksheet.columns = [
      {
        header: "No",
        key: "no",
        width: 10,
      },
      {
        header: "Email",
        key: "email",
        width: 40,
      },
      {
        header: "Status",
        key: "status",
        width: 20,
      },
      {
        header: "Waktu Presensi",
        key: "time",
        width: 30,
      },
    ];

    let no = 1;

    for (const participant of participants) {
      const user =
        await User.findByPk(
          participant.user_id
        );

      const attendance =
        attendances.find(
          (a) =>
            a.user_id ===
            participant.user_id
        );

      worksheet.addRow({
        no: no++,
        email: user?.email,
        status:
          attendedIds.includes(
            participant.user_id
          )
            ? "Hadir"
            : "Tidak Hadir",
        time:
          attendance?.check_in_time ||
          "-",
      });
    }

    worksheet.getRow(1).font = {
      bold: true,
    };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=rekap-${meeting.title}.xlsx`
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};