import Service from '../models/ModelService.js';
import Unit from '../models/ModelUnit.js';

export const getService = async (req, res) => {
  try {
    const { rows: response, count: total } = await Service.findAndCountAll({
      attributes: [
        'uuid',
        'name',
        'no_hp',
        'email',
        'address',
        'category',
        'year',
        'service_type',
        'service_date',
        'service_time',
      ],
      include: [
        {
          model: Unit,
          as: 'unit',
          attributes: ['uuid', 'type_name'],
        },
      ],
    });

    return res.status(200).json({ response, total });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createService = async (req, res) => {
  const {
    name,
    no_hp,
    email,
    address,
    category,
    unit_id,
    year,
    service_type,
    service_date,
    service_time,
  } = req.body;

  const unit = await Unit.findByPk(unit_id);

  if (!unit) {
    return res.status(404).json({ message: 'Unit Tidak Di Temukan!' });
  }

  try {
    await Service.create({
      name,
      no_hp,
      email,
      address,
      category,
      unit_id,
      year,
      service_type,
      service_date,
      service_time,
    });

    return res.status(201).json({ message: 'Berhasil Menambahkan Service !' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
