import Frame from "../models/ModelFrame.js";
import Unit from "../models/ModelUnit.js";

export const createFrame = async (req, res) => {
  const {
    frame_type,
    front_suspension_type,
    rear_suspension_type,
    front_tire_size,
    rear_tire_size,
    front_brake,
    rear_brake,
    unit_id,
  } = req.body;

  const unit = await Unit.findByPk(unit_id);

  if (!unit) {
    return res.status(404).json({ message: "Unit tidak di temukan!" });
  }

  try {
    const frame = await Frame.create({
      frame_type,
      front_suspension_type,
      rear_suspension_type,
      front_tire_size,
      rear_tire_size,
      front_brake,
      rear_brake,
      unit_id,
    });

    return res.status(201).json({
      message: "Frame created successfully",
      data: frame,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
