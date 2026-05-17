const User = require("../models/auth/user.model");
const Role = require("../models/auth/role.model");

exports.assignRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const role = await Role.findOne({
      where: { name: role_name },
    });

    if (!role) {
      return res.status(404).json({ message: "Role tidak ditemukan" });
    }

    await user.addRole(role);

    res.json({ message: "Role berhasil ditambahkan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Role,
        as: "roles",
      },
    });

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};