const User = require("../models/auth/user.model");
const Role = require("../models/auth/role.model");
const UserRole = require("../models/auth/userRole.model");
const UserProfile = require("../models/auth/userProfile.model");
const Notification = require("../models/auth/notification.model");

// User - Profile
User.hasOne(UserProfile, { foreignKey: "user_id" });
UserProfile.belongsTo(User, { foreignKey: "user_id" });

// User - Role (Many to Many)
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  as: "roles", // 🔥 penting
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  as: "users",
});

// USER - NOTIFICATION
User.hasMany(Notification, {
  foreignKey: "user_id",
});

Notification.belongsTo(User, {
  foreignKey: "user_id",
});