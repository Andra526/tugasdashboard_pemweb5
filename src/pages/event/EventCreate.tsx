import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../component/ui/Input";            


const eventSchema = z.object({
  name: z.string().min(3, "Nama event minimal 3 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  location: z.string().min(3, "Lokasi minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function EventCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: EventFormData) => {
    console.log("Event Data:", data);
    alert("Event berhasil dibuat!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a0a10]">Tambah Event</h1>
        <p className="text-sm text-gray-500 mt-1">Lengkapi data untuk membuat event baru.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        
        {/* Nama Event */}
        <Input
          label="Nama Event"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Contoh: Invofest 2026"
        />

        {/* Kategori */}
        <div className="flex flex-col mb-4">
          <label className="font-semibold mb-1 text-gray-700">Kategori</label>
          <select 
            {...register("category")} 
            className={`border p-2 rounded outline-none transition focus:ring-2 focus:ring-red-500 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Competition">Competition</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
        </div>

        {/* Tanggal */}
        <Input
          label="Tanggal Event"
          name="date"
          type="date"
          register={register}
          error={errors.date?.message}
        />

        {/* Lokasi */}
        <Input
          label="Lokasi"
          name="location"
          register={register}
          error={errors.location?.message}
          placeholder="Lokasi pelaksanaan"
        />

        {/* Deskripsi */}
        <Input
          label="Deskripsi Event"
          name="description"
          register={register}
          error={errors.description?.message}
          placeholder="Jelaskan detail event..."
        />

        <button
          type="submit"
          className="bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition font-semibold mt-2 shadow-sm"
        >
          Simpan Event
        </button>
      </form>
    </div>
  );
}