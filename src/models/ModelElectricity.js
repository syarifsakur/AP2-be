import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Unit from "./ModelUnit.js";

const Electricity = db.define(
  "electricity",
  {
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    battery_type: {
      type: DataTypes.STRING,
    },

    ignition_system: {
      type: DataTypes.STRING,
    },
    plug_type: {
      type: DataTypes.STRING,
    },
    unit_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

Electricity.belongsTo(Unit, {
  foreignKey: "unit_id",
  as: "unit",
  onDelete: "cascade",
});
Unit.hasOne(Electricity, {
  foreignKey: "unit_id",
  as: "Electricity",
});

export default Electricity;
