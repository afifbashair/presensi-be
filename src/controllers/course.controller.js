const Course = require("../models/presensi/course.model");

// GET ALL COURSE
exports.getAll = async (req, res) => {
  const data = await Course.findAll();
  res.json(data);
};

// SEED DATA COURSE (JALANKAN SEKALI)
exports.seed = async (req, res) => {
  const courses = [
    { name: "Praktikum Teknologi Cloud Computing" },
    { name: "Praktikum Teknologi dan Pemrograman Mobile" },
    { name: "Teknologi dan Pemrograman Mobile" },
  ];

  await Course.bulkCreate(courses);

  res.json({ message: "Course berhasil ditambahkan" });
};