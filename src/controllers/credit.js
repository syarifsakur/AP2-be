import Credit from "../models/ModelCredit.js";
import Unit from "../models/ModelUnit.js";

export const getCredit = async (req, res) => {
  try {
    const { rows: response, count: total } = await Credit.findAndCountAll({
      attributes: [
        "uuid",
        "name",
        "email",
        "no_hp",
        "address",
        "province",
        "city",
        "category_motor",
        "year",
        "down_payment",
        "tenor_amount",
        "message",
        "createdAt",
      ],
      include: [
        {
          model: Unit,
          as: "unit",
          attributes: ["type_name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ response, total });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createCredit = async (req, res) => {
  const {
    name,
    email,
    phone,
    address,
    province,
    city,
    category_motor,
    unit_id,
    year,
    down_payment,
    tenor_amount,
    message,
  } = req.body;

  const unit = await Unit.findByPk(unit_id);

  if (!unit) {
    return res.status(404).json({ message: "Unit not found!" });
  }

  try {
    await Credit.create({
      name,
      email,
      no_hp: phone,
      address,
      province,
      city,
      category_motor,
      unit_id,
      year,
      down_payment,
      tenor_amount,
      message,
    });

    return res.status(201).json({ message: "Credit created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const deleteCredit = async (req, res) => {
  try {
    const { id } = req.params;
    const credit = await Credit.findByPk(id);

    if (!credit)
      return res.status(404).json({ message: "Credit tidak di temukan!" });

    credit.destroy();

    return res.status(200).json({ message: "Berhasil Menghapus Credit!" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
