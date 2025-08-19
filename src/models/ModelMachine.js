import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Unit from "./ModelUnit.js";

const Machine = db.define(
  "machine",
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
    machine_type: {
      type: DataTypes.STRING,
    },
    machine_capacity: {
      type: DataTypes.STRING,
    },
    fuel_supply_system: {
      type: DataTypes.STRING,
    },
    diameter: {
      type: DataTypes.STRING,
    },
    tranmisi_type: {
      type: DataTypes.STRING,
    },
    compression_ratio: {
      type: DataTypes.STRING,
    },
    max_power: {
      type: DataTypes.STRING,
    },
    max_torque: {
      type: DataTypes.STRING,
    },
    starter_type: {
      type: DataTypes.STRING,
    },
    kopling_type: {
      type: DataTypes.STRING,
    },
    air_cooled_engine: {
      type: DataTypes.STRING,
    },
    gear_shift_pattern: {
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

Machine.belongsTo(Unit, {
  foreignKey: "unit_id",
  as: "unit",
  onDelete: "cascade",
});
Unit.hasOne(Machine, {
  foreignKey: "unit_id",
  as: "machine",
});

export default Machine;
