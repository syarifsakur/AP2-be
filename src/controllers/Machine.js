import Machine from "../models/ModelMachine.js";
import Unit from "../models/ModelUnit.js";

export const createMachine = async (req, res) => {
  const {
    machine_type,
    machine_capacity,
    fuel_supply_system,
    diameter,
    tranmisi_type,
    compression_ratio,
    max_power,
    max_torque,
    starter_type,
    kopling_type,
    air_cooled_engine,
    gear_shift_pattern,
    unit_id,
  } = req.body;

  const unit = await Unit.findByPk(unit_id);

  if (!unit) {
    return res.status(404).json({ message: "Unit tidak ditemukan!" });
  }

  try {
    await Machine.create({
      machine_type,
      machine_capacity,
      fuel_supply_system,
      diameter,
      tranmisi_type,
      compression_ratio,
      max_power,
      max_torque,
      starter_type,
      kopling_type,
      air_cooled_engine,
      gear_shift_pattern,
      unit_id,
    });

    return res.status(201).json({
      message: "Machine created successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
