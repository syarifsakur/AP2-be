import { DataTypes } from 'sequelize';
import db from '../config/database.js';
import Unit from './ModelUnit.js';

const Frame = db.define(
  'frame',
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
    frame_type: {
      type: DataTypes.STRING,
    },
    front_suspension_type: {
      type: DataTypes.STRING,
    },
    rear_suspension_type: {
      type: DataTypes.STRING,
    },
    front_tire_size: {
      type: DataTypes.STRING,
    },
    rear_tire_size: {
      type: DataTypes.STRING,
    },
    front_brake: {
      type: DataTypes.STRING,
    },
    rear_brake: {
      type: DataTypes.STRING,
    },
    braking_system: {
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

Frame.belongsTo(Unit, {
  foreignKey: 'unit_id',
  as: 'unit',
  onDelete: 'cascade',
});
Unit.hasOne(Frame, {
  foreignKey: 'unit_id',
  as: 'frame',
});

export default Frame;
