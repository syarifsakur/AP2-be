import Capacity from "../models/ModelCapacity.js";
import Unit from "../models/ModelUnit.js";

export const createCapacity = async (req, res) => {
  const { fuel_tank_capacity, lubricating_oil_capacity, unit_id } = req.body;

  const unit = await Unit.findByPk(unit_id);
  if (!unit) {
    return res.status(404).json({ message: "Unit tidak ditemukan!" });
  }

  try {
    await Capacity.create({
      fuel_tank_capacity,
      lubricating_oil_capacity,
      unit_id,
    });

    return res.status(201).json({
      message: "Capacity created successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
