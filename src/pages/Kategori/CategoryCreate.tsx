import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  name: string;
  icon?: string;
  description: string;
  status: string;
};

const schema = z.object({
  name: z.string().min(3, "Nama kategori minimal 3 karakter"),
  icon: z.string().optional(),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
  status: z.string().min(1, "Status wajib dipilih"),
});

export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Data kategori:", data);
    alert("Kategori berhasil dibuat!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-2">Tambah Kategori Event</h1>
      <p className="text-sm text-gray-500 mb-6">
        Digunakan untuk mengelompokkan event seperti Seminar, Workshop, dll.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Nama */}
        <div>
          <label className="block font-medium">Nama Kategori</label>
          <input
            type="text"
            placeholder="Contoh: Seminar"
            {...register("name")}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Icon */}
        <div>
          <label className="block font-medium">Icon (optional)</label>
          <input
            type="text"
            placeholder="Contoh: 🎤"
            {...register("icon")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block font-medium">Deskripsi</label>
          <textarea
            placeholder="Deskripsi kategori"
            {...register("description")}
            className="w-full border p-2 rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            {...register("status")}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Pilih Status --</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status.message}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          Simpan Kategori
        </button>
      </form>
    </div>
  );
}