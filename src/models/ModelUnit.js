import { DataTypes } from 'sequelize';
import db from '../config/database.js';

const Unit = db.define(
  'unit',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    path_img: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM('matic', 'sport', 'cub', 'ev', 'bigbike'),
      allowNull: false,
    },
    stok: {
      type: DataTypes.INTEGER,
    },
    ket: {
      type: DataTypes.ENUM('ready', 'inden', 'sold'),
    },
  },
  {
    freezeTableName: true,
  }
);

export default Unit;
