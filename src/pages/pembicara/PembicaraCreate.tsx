import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../component/ui/Input";

const pembicaraSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  job: z.string().min(3, "Pekerjaan minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  photo: z.string().optional(),
  bio: z.string().min(5, "Bio minimal 5 karakter"),
});

type PembicaraFormData = z.infer<typeof pembicaraSchema>;

export default function PembicaraCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PembicaraFormData>({
    resolver: zodResolver(pembicaraSchema),
  });

  const onSubmit = (data: PembicaraFormData) => {
    console.log("Data Pembicara:", data);
    alert("Pembicara berhasil ditambahkan!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a0a10]">Tambah Pembicara</h1>
        <p className="text-sm text-gray-500 mt-1">Masukkan informasi lengkap pembicara event.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        
        <Input
          label="Nama Lengkap"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Contoh: Zahra"
        />

        <Input
          label="Pekerjaan / Instansi"
          name="job"
          register={register}
          error={errors.job?.message}
          placeholder="Contoh: Senior Developer"
        />

        <Input
          label="Email"
          name="email"
          type="email"
          register={register}
          error={errors.email?.message}
          placeholder="email@contoh.com"
        />

        <Input
          label="URL Foto (Opsional)"
          name="photo"
          register={register}
          error={errors.photo?.message}
          placeholder="https://link-foto.com/gambar.jpg"
        />

        <Input
          label="Bio Singkat"
          name="bio"
          register={register}
          error={errors.bio?.message}
          placeholder="Jelaskan singkat tentang pembicara..."
        />

        <button
          type="submit"
          className="bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition font-semibold mt-2 shadow-sm"
        >
          Simpan Pembicara
        </button>
      </form>
    </div>
  );
}