import { z } from 'zod';

const schemaUnit = z.object({
  type_name: z.string().min(1, 'Tipe motor wajib diisi'),
  price: z.string().min(1, 'Harga wajib diisi'),
  category: z.string().min(1, 'Kategori wajib dipilih'),

  // Mesin
  machine_type: z.string().min(1, 'Tipe mesin wajib diisi'),
  machine_capacity: z.string().min(1, 'Kapasitas mesin wajib diisi'),
  fuel_supply_system: z.string().min(1, 'Sistem bahan bakar wajib diisi'),
  diameter: z.string().min(1, 'Diameter wajib diisi'),
  tranmisi_type: z.string().min(1, 'Tipe transmisi wajib diisi'),
  compression_ratio: z.string().min(1, 'Rasio kompresi wajib diisi'),
  max_power: z.string().min(1, 'Daya maksimum wajib diisi'),
  max_torque: z.string().min(1, 'Torsi maksimum wajib diisi'),
  starter_type: z.string().min(1, 'Tipe starter wajib diisi'),
  kopling_type: z.string().min(1, 'Tipe kopling wajib diisi'),
  air_cooled_engine: z.string().min(1, 'Pendinginan mesin wajib diisi'),
  gear_shift_pattern: z.string().min(1, 'Pola perpindahan gigi wajib diisi'),

  // Kerangka
  frame_type: z.string().min(1, 'Tipe kerangka wajib diisi'),
  front_suspension_type: z.string().min(1, 'Suspensi depan wajib diisi'),
  rear_suspension_type: z.string().min(1, 'Suspensi belakang wajib diisi'),
  front_tire_size: z.string().min(1, 'Ukuran ban depan wajib diisi'),
  rear_tire_size: z.string().min(1, 'Ukuran ban belakang wajib diisi'),
  front_brake: z.string().min(1, 'Rem depan wajib diisi'),
  rear_brake: z.string().min(1, 'Rem belakang wajib diisi'),

  // Elektrik
  battery_type: z.string().min(1, 'Tipe baterai wajib diisi'),
  ignition_system: z.string().min(1, 'Sistem pengapian wajib diisi'),
  plug_type: z.string().min(1, 'Tipe busi wajib diisi'),

  // Dimensi
  lwh: z.string().min(1, 'Dimensi wajib diisi'),
  wheel_axis_distance: z.string().min(1, 'Jarak sumbu roda wajib diisi'),
  lowest_distance: z.string().min(1, 'Jarak terendah wajib diisi'),
  curb_weight: z.string().min(1, 'Berat kosong wajib diisi'),

  // Kapasitas
  fuel_tank_capacity: z.string().min(1, 'Kapasitas tangki wajib diisi'),
  lubricating_oil_capacity: z.string().min(1, 'Kapasitas oli wajib diisi'),
});

export { schemaUnit };
