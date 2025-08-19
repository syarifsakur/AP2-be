import Electricity from "../models/ModelElectricity.js";
import Unit from "../models/ModelUnit.js";

export const createElectricity = async (req, res) => {
  const { battery_type, ignition_system, plug_type, unit_id } = req.body;

  const unit = await Unit.findByPk(unit_id);

  try {
    await Electricity.create({
      battery_type,
      ignition_system,
      plug_type,
      unit_id,
    });

    return res.status(201).json({
      message: "Electricity created successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
