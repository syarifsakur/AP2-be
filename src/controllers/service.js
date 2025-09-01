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
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ response, total });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Unit.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: 'Service Tidak Di Temukan !' });
    }

    return res.status(200).json({ service });
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

export const updateService = async (req, res) => {
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
  const { id } = req.params;

  const service = await Service.findByPk(id);
  if (!service) {
    return res.status(404).json({ message: 'Service Tidak Di Temukan !' });
  }

  const unit = await Unit.findByPk(unit_id);

  if (!unit) {
    return res.status(404).json({ message: 'Unit Tidak Di Temukan!' });
  }
  try {
    await service.update({
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

    return res.status(200).json({ message: 'Berhasil Mengupdate Service !' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: 'Service Tidak Di Temukan !' });
    }

    await service.destroy();

    return res.status(200).json({ message: 'Service Berhasil Di Hapus !' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
