import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Unit from "./ModelUnit.js";

const Dimensions = db.define(
  "dimensions",
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
    lwh: {
      type: DataTypes.STRING,
    },
    wheel_axis_distance: {
      type: DataTypes.STRING,
    },

    lowest_distance: {
      type: DataTypes.STRING,
    },
    curb_weight: {
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


Dimensions.belongsTo(Unit, {
  foreignKey: "unit_id",
  as: "unit",
  onDelete: "cascade",
});
Unit.hasOne(Dimensions, {
  foreignKey: "unit_id",
  as: "Dimensions",
});

export default Dimensions;
