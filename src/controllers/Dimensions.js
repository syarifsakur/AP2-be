import Dimensions from "../models/ModelDimensions.js";
import Unit from "../models/ModelUnit.js";

export const createDimensions = async (req, res) => {
  const { lwh, wheel_axis_distance, lowest_distance, curb_weight, unit_id } =
    req.body;

  const unit = await Unit.findByPk(unit_id);

  if (!unit) {
    return res.status(404).json({ message: "Unit tidak ditemukan!" });
  }

  try {
    const dimensions = await Dimensions.create({
      lwh,
      wheel_axis_distance,
      lowest_distance,
      curb_weight,
      unit_id,
    });

    return res.status(201).json({
      message: "Dimensions created successfully",
      data: dimensions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
