const Meeting = require("../models/presensi/meeting.model");
const Course = require("../models/presensi/course.model");

// CREATE
exports.createMeeting = async (req, res) => {
  const data = await Meeting.create(req.body);
  res.json(data);
};

// GET BY COURSE
exports.getByCourse = async (req, res) => {
  const { course_id } = req.params;

  const data = await Meeting.findAll({
    where: { course_id },
    order: [["date", "ASC"]],
  });

  res.json(data);
};

// SEED
exports.seedMeeting = async (req, res) => {
  const courses = await Course.findAll();

  for (const course of courses) {
    await Meeting.findOrCreate({
      where: { course_id: course.id, title: "Presensi" },
      defaults: { type: "attendance" },
    });

    for (let i = 1; i <= 3; i++) {
      await Meeting.findOrCreate({
        where: {
          course_id: course.id,
          title: `Pertemuan ${i}`,
        },
        defaults: {
          type: "material",
          content: "https://example.com",
        },
      });
    }
  }

  res.json({ message: "Meeting + materi berhasil dibuat" });
};

// UPDATE
exports.updateMeeting = async (req, res) => {
  const { id } = req.params;

  await Meeting.update(req.body, {
    where: { id },
  });

  res.json({ message: "Meeting berhasil diupdate" });
};

// DELETE
exports.deleteMeeting = async (req, res) => {
  const { id } = req.params;

  await Meeting.destroy({
    where: { id },
  });

  res.json({ message: "Meeting berhasil dihapus" });
};

//meeting
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.findAll({
      order: [["date", "DESC"]],
    });

    res.json(meetings);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};