const { DataTypes } = require("sequelize");
const dbPresensi = require("../../config/dbPresensi");

const Campus = dbPresensi.define("Campus", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  radius: {
    type: DataTypes.INTEGER, // meter
    allowNull: false,
  },
});

module.exports = Campus;