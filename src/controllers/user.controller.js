const User = require("../models/auth/user.model");
const Role = require("../models/auth/role.model");
const bcrypt = require("bcryptjs");
const UserRole = require("../models/auth/userRole.model");
const UserProfile = require("../models/auth/userProfile.model");

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
    const users =
      await User.findAll();

    const result =
      await Promise.all(
        users.map(async (u) => {

          const roles =
            await u.getRoles();

          return {
            id: u.id,
            name: u.name,
            email: u.email,
            roles: roles.map(
              (r) => r.name
            ),
          };
        })
      );

    res.json(result);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // VALIDASI
    const existing = await User.findOne({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({
        message: "Email sudah digunakan",
      });
    }

    // HASH PASSWORD
    const hashed =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    // CREATE PROFILE
    await UserProfile.create({
      user_id: user.id,
      full_name: name,
      phone: "",
      address: "",
      bio: "",
      avatar: "",
    });

    // ASSIGN ROLE
    const roleData =
      await Role.findOne({
        where: { name: role },
      });

    if (roleData) {
      await UserRole.create({
        user_id: user.id,
        role_id: roleData.id,
      });
    }

    res.json({
      message:
        "User berhasil dibuat",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: { id },
    });

    res.json({
      message:
        "User berhasil dihapus",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};