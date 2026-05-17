const Campus = require("../models/presensi/campus.model");

// CREATE
exports.createCampus = async (req, res) => {
  try {
    const campus = await Campus.create(req.body);
    res.json(campus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getAllCampus = async (req, res) => {
  try {
    const data = await Campus.findAll({
      order: [["id", "DESC"]],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
exports.getCampusById = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ message: "Campus not found" });
    }
    res.json(campus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateCampus = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ message: "Campus not found" });
    }

    await campus.update(req.body);
    res.json(campus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
exports.deleteCampus = async (req, res) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    if (!campus) {
      return res.status(404).json({ message: "Campus not found" });
    }

    await campus.destroy();
    res.json({ message: "Campus deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};