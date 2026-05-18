const { DataTypes } =
  require("sequelize");

const sequelize = require("../../config/dbAuth");

const UserProfile =
  sequelize.define(
    "UserProfile",
    {
      user_id: {
        type: DataTypes.INTEGER,
      },

      full_name: {
        type: DataTypes.STRING,
      },

      phone: {
        type: DataTypes.STRING,
      },

      address: {
        type: DataTypes.TEXT,
      },

      bio: {
        type: DataTypes.TEXT,
      },

      avatar: {
        type: DataTypes.TEXT,
      },
    }
  );

module.exports = UserProfile;