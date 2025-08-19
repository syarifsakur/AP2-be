import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Unit from "./ModelUnit.js";

const Credit = db.define(
  "credit",
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
    name: {
      type: DataTypes.STRING,
    },
    no_hp: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    category_motor: {
      type: DataTypes.ENUM("matic", "sport", "cub", "ev", "bigbike"),
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
    },
    down_payment: {
      type: DataTypes.STRING,
    },
    tenor_amount: {
      type: DataTypes.ENUM(
        "12 bulan",
        "24 bulan",
        "36 bulan",
        "48 bulan",
        "60 bulan"
      ),
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Credit.belongsTo(Unit, {
  foreignKey: "unit_id",
  as: "unit",
  onDelete: "cascade",
});

export default Credit;
