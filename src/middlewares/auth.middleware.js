const jwt = require("jsonwebtoken");
const User = require("../models/auth/user.model");
const Role = require("../models/auth/role.model");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token" });
  }

  // 🔥 ambil token setelah "Bearer "
  const token = authHeader.split(" ")[1];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Token format salah",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      include: {
        model: Role,
        as: "roles",
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    req.user = {
      id: user.id,
      roles: user.roles.map((r) => r.name),
    };

    console.log("USER LOGIN:", req.user);

    next();
  } catch (err) {
    
    console.log(err); // biar keliatan error aslinya
    res.status(401).json({ message: "Invalid token" });
  }
};