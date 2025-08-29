import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import Unit from './ModelUnit.js';

const Service = db.define(
  'service',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
    category: {
      type: DataTypes.ENUM('matic', 'sport', 'cub', 'ev', 'bigbike'),
      allowNull: false,
    },
    unit_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
    },
    service_type: {
      type: DataTypes.STRING,
    },
    service_date: {
      type: DataTypes.DATE,
    },
    service_time: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

Service.belongsTo(Unit, {
  foreignKey: 'unit_id',
  as: 'unit',
  onDelete: 'cascade',
});

export default Service;
