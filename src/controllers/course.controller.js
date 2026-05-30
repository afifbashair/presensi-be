const Course =
  require("../models/presensi/course.model");
const CourseUser =
require("../models/auth/courseUser.model");
const User =
require("../models/auth/user.model");

// GET
exports.getCourses = async (
  req,
  res
) => {
  try {
    const courses =
      await Course.findAll();

    res.json(courses);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// CREATE
exports.createCourse = async (
  req,
  res
) => {
  try {
    await Course.create(req.body);

    res.json({
      message:
        "Course berhasil dibuat",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE
exports.updateCourse = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await Course.update(
      req.body,
      {
        where: { id },
      }
    );

    res.json({
      message:
        "Course berhasil diupdate",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE
exports.deleteCourse = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    await Course.destroy({
      where: { id },
    });

    res.json({
      message:
        "Course berhasil dihapus",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.enrollUser = async (req, res) => {
  try {

    const { course_id, user_id } =
      req.body;

    const existing =
      await CourseUser.findOne({
        where: {
          course_id,
          user_id,
        },
      });

    if (existing) {
      return res.status(400).json({
        message:
          "User sudah terdaftar pada course ini",
      });
    }

    await CourseUser.create({
      course_id,
      user_id,
    });

    res.json({
      message:
        "Peserta berhasil ditambahkan",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getParticipants =
async (req, res) => {

  try {

    const { course_id } =
      req.params;

    const participants =
      await CourseUser.findAll({
        where: {
          course_id,
        },
      });

    const data =
      await Promise.all(
        participants.map(
          async (p) => {

            const user =
              await User.findByPk(
                p.user_id
              );

            return {
              id: user.id,
              email: user.email,
            };
          }
        )
      );

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message:
        err.message,
    });

  }
};

exports.removeParticipant =
async (req, res) => {

  try {

    const { course_id, user_id } =
      req.params;

    await CourseUser.destroy({
      where: {
        course_id,
        user_id,
      },
    });

    res.json({
      message:
        "Peserta berhasil dihapus",
    });

  } catch (err) {

    res.status(500).json({
      message:
        err.message,
    });

  }
};

exports.getCourseStudents = async (req, res) => {
  try {
    const { id } = req.params;

    const courseUsers =
      await CourseUser.findAll({
        where: {
          course_id: id,
        },
      });

    const students =
      await Promise.all(
        courseUsers.map(async (cu) => {
          const user =
            await User.findByPk(
              cu.user_id
            );

          return {
            course_user_id: cu.id,
            id: user.id,
            email: user.email,
          };
        })
      );

    res.json(students);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};