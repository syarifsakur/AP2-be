import Part from '../models/ModelPart.js';
import path from 'path';
import fs from 'fs';

// user
export const getPart = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const { rows: response, count: total } = await Part.findAndCountAll({
      attributes: [
        'uuid',
        'no_part',
        'name_part',
        'size',
        'price',
        'img',
        'path_img',
      ],
      offset: offset,
      limit: limit,
      order: [['createdAt', 'DESC']],
    });

    const totalPage = Math.ceil(total / limit);

    return res.status(200).json({ response, totalPage, total, page });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// admin
export const createPart = async (req, res) => {
  const { no_part, name_part, size, price } = req.body;

  if (!req.files) return res.status(422).json({ img: 'Img harus di isi!' });

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const allowedTypes = ['.png', '.jpg', '.jpeg'];
  const filename = Date.now() + ext;

  if (!allowedTypes.includes(ext.toLowerCase()))
    return res.status(422).json({ img: 'Format img tidak di dukung!' });
  if (fileSize > 30000000)
    return res.status(422).json({ img: 'Ukuran img terlalu besar!' });

  const pathImg = `${req.protocol}://${req.get(
    'host'
  )}/public/part/${filename}`;

  file.mv(`public/part/${filename}`);
  try {
    await Part.create({
      no_part,
      name_part,
      size,
      price,
      img: filename,
      path_img: pathImg,
    });

    return res.status(201).json({ message: 'Berhasil MEnambahkan Part !' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// admin
export const updatePart = async (req, res) => {
  const { no_part, name_part, size, price } = req.body;
  const { id } = req.params;

  const part = await Part.findByPk(id);

  if (!part) {
    return res.status(404).json({ message: 'Part Tidak Di Temukan !' });
  }

  if (!req.files) {
    try {
      await part.update({
        no_part,
        name_part,
        size,
        price,
      });

      return res.status(200).json({ message: 'Berhasil MEngupdate Part !' });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    try {
      const file = req.files.file;
      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const allowedTypes = ['.png', '.jpg', '.jpeg'];
      const filename = Date.now() + ext;

      if (!allowedTypes.includes(ext.toLowerCase()))
        return res.status(422).json({ img: 'Format img tidak di dukung!' });
      if (fileSize > 30000000)
        return res.status(422).json({ img: 'Ukuran img terlalu besar!' });

      const pathImg = `${req.protocol}://${req.get(
        'host'
      )}/public/part/${filename}`;

      if (part.img) {
        fs.unlinkSync(`public/part/${part.img}`);
      }

      file.mv(`public/part/${filename}`);
      await part.update({
        no_part,
        name_part,
        size,
        price,
        img: filename,
        path_img: pathImg,
      });

      return res.status(200).json({ message: 'Berhasil Mengupdate Part !' });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
};

export const deletePart = async (req, res) => {
  try {
    const { id } = req.params;

    const part = await Part.findByPk(id);
    if (!part) {
      return res.status(404).json({ message: 'Part Tidak Di Temukan !' });
    }

    if (part.img) {
      fs.unlinkSync(`public/part/${part.img}`);
    }

    await part.destroy();

    return res.status(200).json({ message: 'BErhasul Menghapus Part !' });
  } catch (error) {
    return res.status(500).json(error);
  }
};
