const { DataTypes } = require("sequelize");
const sequelize = require("../../config/dbAuth");

const Notification =
  sequelize.define(
    "Notification",
    {
      user_id: DataTypes.INTEGER,

      title: DataTypes.STRING,

      message: DataTypes.TEXT,

      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      }
    },
    {
    tableName: "notifications",
    freezeTableName: true,
    }
  );

module.exports = Notification;