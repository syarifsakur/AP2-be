import { z } from "zod";

const schemaCredit = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi!" }),
  email: z.string().email().nonempty({ message: "Email tidak boleh kosong!" }),
  phone: z.string().min(1, { message: "No. Handphone wajib diisi!" }),
  address: z.string().min(1, { message: "Alamat wajib diisi!" }),
  province: z.string().min(1, { message: "Provinsi wajib dipilih!" }),
  city: z.string().min(1, { message: "Kota wajib dipilih!" }),
  category_motor: z.enum(["matic", "sport", "cub", "ev", "bigbike"], {
    errorMap: () => ({ message: "Kategori motor wajib dipilih!" }),
  }),
  unit_id: z.string().min(1, { message: "Unit ID wajib diisi!" }),
  year: z.string().min(1, { message: "Tahun wajib dipilih!" }),
  tenor_amount: z.enum(
    ["12 bulan", "24 bulan", "36 bulan", "48 bulan", "60 bulan"],
    {
      message:
        "tenor_amount harus 12 bulan || 24 bulan || 36 bulan || 48 bulan || 60 bulan",
    }
  ),
  message: z.string().optional(),
});

export { schemaCredit };
