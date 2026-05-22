import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = (data: EventFormData) => {
    const existingEvents = JSON.parse(localStorage.getItem("invofest_events") || "[]");

    const newEvent = {
      id: Date.now(),
      ...data, // Menyimpan semua data dari form
    };

    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem("invofest_events", JSON.stringify(updatedEvents));

    alert("Event berhasil dibuat!");
    navigate("/dashboard/event");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/80 backdrop-blur-xl rounded-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Tambah Event Baru</h1>
        <p className="text-sm text-gray-500 mt-1">Lengkapi form berikut untuk mendaftarkan event.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        
        <Input label="Nama Event" name="name" register={register} error={errors.name?.message} placeholder="Contoh: Invofest 2026" />

        {/* Kategori dengan Opsi Talkshow */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1.5 text-gray-700">Kategori</label>
          <select 
            {...register("category")} 
            className={`border p-3 rounded-xl outline-none transition focus:ring-2 focus:ring-[#7B1D3F]/20 focus:border-[#7B1D3F] bg-white ${
              errors.category ? "border-red-500" : "border-gray-200"
            }`}
          >
            <option value="">-- Pilih Kategori --</option>
            <option value="Seminar">Seminar</option>
            <option value="Workshop">Workshop</option>
            <option value="Competition">Competition</option>
            <option value="Talkshow">Talkshow</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1 font-medium">{errors.category.message}</p>}
        </div>

        <Input label="Tanggal Event" name="date" type="date" register={register} error={errors.date?.message} />
        <Input label="Lokasi" name="location" register={register} error={errors.location?.message} placeholder="Lokasi pelaksanaan" />
        <Input label="Deskripsi Event" name="description" register={register} error={errors.description?.message} placeholder="Jelaskan detail event..." />

        <button
          type="submit"
          className="bg-[#7B1D3F] text-white py-3 rounded-xl hover:bg-[#5e1630] transition font-bold mt-4 shadow-lg shadow-[#7B1D3F]/20 cursor-pointer"
        >
          Simpan Event
        </button>
      </form>
    </div>
  );
}