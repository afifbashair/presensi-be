const User = require("../models/auth/user.model");
const UserProfile = require("../models/auth/userProfile.model");

exports.getMyProfile = async (req, res) => {
  try {
    const user_id = req.user.id;

    let profile = await UserProfile.findOne({
      where: { user_id },
    });

    // AUTO CREATE PROFILE
    if (!profile) {
      profile = await UserProfile.create({
        user_id,
        full_name: "",
        phone: "",
        address: "",
        bio: "",
        avatar: "",
      });
    }

    const user = await User.findByPk(user_id);

    res.json({
      email: user.email,
      profile,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user_id = req.user.id;

    const profile = await UserProfile.findOne({
      where: { user_id },
    });

    await profile.update(req.body);

    res.json({
      message: "Profile berhasil diupdate",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};