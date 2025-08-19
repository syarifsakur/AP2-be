import Capacity from "../models/ModelCapacity.js";
import Dimensions from "../models/ModelDimensions.js";
import Electricity from "../models/ModelElectricity.js";
import Frame from "../models/ModelFrame.js";
import Machine from "../models/ModelMachine.js";
import Unit from "../models/ModelUnit.js";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";

// Admin & user
export const getAllUnits = async (req, res) => {
  try {
    const response = await Unit.findAll({
      include: [
        {
          model: Frame,
          as: "frame",
          attributes: [
            "uuid",
            "frame_type",
            "front_suspension_type",
            "rear_suspension_type",
            "front_tire_size",
            "rear_tire_size",
            "front_brake",
            "rear_brake",
            "braking_system",
          ],
        },
        {
          model: Machine,
          as: "machine",
          attributes: [
            "uuid",
            "machine_type",
            "machine_capacity",
            "fuel_supply_system",
            "diameter",
            "tranmisi_type",
            "compression_ratio",
            "max_power",
            "max_torque",
            "starter_type",
            "kopling_type",
            "air_cooled_engine",
            "gear_shift_pattern",
          ],
        },
        {
          model: Dimensions,
          as: "Dimensions",
          attributes: [
            "uuid",
            "lwh",
            "wheel_axis_distance",
            "lowest_distance",
            "curb_weight",
          ],
        },
        {
          model: Capacity,
          as: "Capacity",
          attributes: ["fuel_tank_capacity", "lubricating_oil_capacity"],
        },
        {
          model: Electricity,
          as: "Electricity",
          attributes: ["battery_type", "ignition_system", "plug_type"],
        },
      ],
      attributes: ["uuid", "type_name", "img", "path_img", "price", "category"],
    });

    const formattedResponse = response.map((unit) => ({
      ...unit.get(),
      specs: [
        { label: "Tipe Mesin", value: unit.machine?.machine_type || "N/A" },
        {
          label: "Kapasitas Mesin",
          value: unit.machine?.machine_capacity || "N/A",
        },
        { label: "Daya Maksimum", value: unit.machine?.max_power || "N/A" },
        { label: "Berat", value: unit.Dimensions?.curb_weight || "N/A" },
        {
          label: "Kapasitas Tangki",
          value: unit.Capacity?.fuel_tank_capacity || "N/A",
        },
        {
          label: "Tipe Baterai",
          value: unit.Electricity?.battery_type || "N/A",
        },
        {
          label: "Sistem Pengapian",
          value: unit.Electricity?.ignition_system || "N/A",
        },
      ],
    }));

    res.status(200).json({ response: formattedResponse });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// Admin
export const getUnitsById = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Unit.findByPk(id, {
      include: [
        {
          model: Frame,
          as: "frame",
          attributes: [
            "uuid",
            "frame_type",
            "front_suspension_type",
            "rear_suspension_type",
            "front_tire_size",
            "rear_tire_size",
            "front_brake",
            "rear_brake",
            "braking_system",
          ],
        },
        {
          model: Machine,
          as: "machine",
          attributes: [
            "uuid",
            "machine_type",
            "machine_capacity",
            "fuel_supply_system",
            "diameter",
            "tranmisi_type",
            "compression_ratio",
            "max_power",
            "max_torque",
            "starter_type",
            "kopling_type",
            "air_cooled_engine",
            "gear_shift_pattern",
          ],
        },
        {
          model: Dimensions,
          as: "Dimensions",
          attributes: [
            "uuid",
            "lwh",
            "wheel_axis_distance",
            "lowest_distance",
            "curb_weight",
          ],
        },
        {
          model: Capacity,
          as: "Capacity",
          attributes: ["fuel_tank_capacity", "lubricating_oil_capacity"],
        },
        {
          model: Electricity,
          as: "Electricity",
          attributes: ["battery_type", "ignition_system", "plug_type"],
        },
      ],
      attributes: ["uuid", "type_name", "img", "path_img", "price", "category"],
    });

    if (!response) {
      return res.status(404).json({ message: "Unit tidak ditemukan" });
    }

    const formattedResponse = {
      ...response.get(),
      specs: [
        { label: "Tipe Mesin", value: response.machine?.machine_type || "N/A" },
        {
          label: "Kapasitas Mesin",
          value: response.machine?.machine_capacity || "N/A",
        },
        { label: "Daya Maksimum", value: response.machine?.max_power || "N/A" },
        { label: "Berat", value: response.Dimensions?.curb_weight || "N/A" },
        {
          label: "Kapasitas Tangki",
          value: response.Capacity?.fuel_tank_capacity || "N/A",
        },
        {
          label: "Tipe Baterai",
          value: response.Electricity?.battery_type || "N/A",
        },
        {
          label: "Sistem Pengapian",
          value: response.Electricity?.ignition_system || "N/A",
        },
      ],
    };

    return res.status(200).json({ response: formattedResponse });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Admin
export const createUnits = async (req, res) => {
  const {
    type_name,
    price,
    category,
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
    frame_type,
    front_suspension_type,
    rear_suspension_type,
    front_tire_size,
    rear_tire_size,
    front_brake,
    rear_brake,
    braking_system,
    battery_type,
    ignition_system,
    plug_type,
    lwh,
    wheel_axis_distance,
    lowest_distance,
    curb_weight,
    fuel_tank_capacity,
    lubricating_oil_capacity,
  } = req.body;

  if (!req.files) return res.status(422).json({ img: "Img harus di isi!" });

  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  const filename = Date.now() + ext;

  if (!allowedTypes.includes(ext.toLowerCase()))
    return res.status(422).json({ img: "Format img tidak di dukung!" });
  if (fileSize > 30000000)
    return res.status(422).json({ img: "Ukuran img terlalu besar!" });

  const pathImg = `${req.protocol}://${req.get(
    "host"
  )}/public/unit/${filename}`;

  file.mv(`public/unit/${filename}`);

  try {
    const unit = await Unit.create({
      type_name: type_name,
      img: filename,
      path_img: pathImg,
      price: price,
      category,
    });

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
      unit_id: unit.uuid,
    });

    await Frame.create({
      frame_type,
      front_suspension_type,
      rear_suspension_type,
      front_tire_size,
      rear_tire_size,
      front_brake,
      rear_brake,
      braking_system,
      unit_id: unit.uuid,
    });

    await Electricity.create({
      battery_type,
      ignition_system,
      plug_type,
      unit_id: unit.uuid,
    });

    await Dimensions.create({
      lwh,
      wheel_axis_distance,
      lowest_distance,
      curb_weight,
      unit_id: unit.uuid,
    });

    await Capacity.create({
      fuel_tank_capacity,
      lubricating_oil_capacity,
      unit_id: unit.uuid,
    });

    return res.status(201).json({ message: "Berhasil Menyimpan Data Unit" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// admin
export const updateUnit = async (req, res) => {
  const {
    type_name,
    price,
    category,
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
    frame_type,
    front_suspension_type,
    rear_suspension_type,
    front_tire_size,
    rear_tire_size,
    front_brake,
    rear_brake,
    braking_system,
    battery_type,
    ignition_system,
    plug_type,
    lwh,
    wheel_axis_distance,
    lowest_distance,
    curb_weight,
    fuel_tank_capacity,
    lubricating_oil_capacity,
  } = req.body;
  const { id } = req.params;

  const unit = await Unit.findOne({ where: { uuid: id } });

  if (!unit) {
    return res.status(400).json({ message: "Unit tidak ditemukan!" });
  }

  if (!req.files) {
    try {
      const unit = await Unit.update(
        {
          type_name: type_name,
          price: price,
          category,
        },
        {
          where: {
            uuid: id,
          },
        }
      );

      await Machine.update(
        {
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
        },
        {
          where: {
            unit_id: id,
          },
        }
      );

      await Frame.update(
        {
          frame_type,
          front_suspension_type,
          rear_suspension_type,
          front_tire_size,
          rear_tire_size,
          front_brake,
          rear_brake,
          braking_system,
        },
        { where: { unit_id: id } }
      );

      await Electricity.update(
        {
          battery_type,
          ignition_system,
          plug_type,
        },
        { where: { unit_id: id } }
      );

      await Dimensions.update(
        {
          lwh,
          wheel_axis_distance,
          lowest_distance,
          curb_weight,
        },
        { where: { unit_id: id } }
      );

      await Capacity.update(
        {
          fuel_tank_capacity,
          lubricating_oil_capacity,
        },
        { where: { unit_id: id } }
      );
      return res.status(200).json({
        message: "Unit berhasil di update",
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const allowedTypes = [".png", ".jpg", ".jpeg"];
    const filename = Date.now() + ext;

    if (!allowedTypes.includes(ext.toLowerCase()))
      return res.status(422).json({ img: "Format img tidak di dukung!" });
    if (fileSize > 30000000)
      return res.status(422).json({ img: "Ukuran img terlalu besar!" });

    const pathImg = `${req.protocol}://${req.get(
      "host"
    )}/public/unit/${filename}`;

    file.mv(`public/unit/${filename}`);

    if (unit.img) {
      fs.unlinkSync(`public/unit/${unit.img}`);
    }
    try {
      const unit = await Unit.update(
        {
          type_name: type_name,
          price: price,
          category,
          img: filename,
          path_img: pathImg,
        },
        {
          where: {
            uuid: id,
          },
        }
      );

      await Machine.update(
        {
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
        },
        {
          where: {
            unit_id: id,
          },
        }
      );

      await Frame.update(
        {
          frame_type,
          front_suspension_type,
          rear_suspension_type,
          front_tire_size,
          rear_tire_size,
          front_brake,
          rear_brake,
          braking_system,
        },
        { where: { unit_id: id } }
      );

      await Electricity.update(
        {
          battery_type,
          ignition_system,
          plug_type,
        },
        { where: { unit_id: id } }
      );

      await Dimensions.update(
        {
          lwh,
          wheel_axis_distance,
          lowest_distance,
          curb_weight,
        },
        { where: { unit_id: id } }
      );

      await Capacity.update(
        {
          fuel_tank_capacity,
          lubricating_oil_capacity,
        },
        { where: { unit_id: id } }
      );
      return res.status(200).json({
        message: "Unit berhasil di update",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

// admin
export const deleteUnit = async (req, res) => {
  try {
    const { id } = req.params;
    const unit = await Unit.findOne({ where: { uuid: id } });

    if (!unit) {
      return res.status(404).json({ message: "Unit tidak ditemukan!" });
    }

    if (unit.img) {
      fs.unlinkSync(`public/unit/${unit.img}`);
    }

    unit.destroy();
    return res.status(200).json({ message: "Unit berhasil dihapus!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
