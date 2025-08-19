import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Unit from "./ModelUnit.js";

const Capacity = db.define(
  "capacity",
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
    fuel_tank_capacity: {
      type: DataTypes.STRING,
    },
    lubricating_oil_capacity: {
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


Capacity.belongsTo(Unit, {
  foreignKey: "unit_id",
  as: "unit",
  onDelete: "cascade",
});
Unit.hasOne(Capacity, {
  foreignKey: "unit_id",
  as: "Capacity",
});

export default Capacity;
