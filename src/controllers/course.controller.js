const Course =
  require("../models/presensi/course.model");

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