import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  job: z.string().min(3, "Pekerjaan minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  photo: z.string().optional(),
  bio: z.string().min(5, "Bio minimal 5 karakter"),
  status: z.string().min(1, "Status wajib dipilih"),
});

type FormData = z.infer<typeof schema>;

export default function PembicaraCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Pembicara:", data);
    alert("Pembicara berhasil ditambahkan!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Tambah Pembicara</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        <input
          {...register("name")}
          placeholder="Nama"
          className="border p-2 rounded"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          {...register("job")}
          placeholder="Pekerjaan"
          className="border p-2 rounded"
        />
        {errors.job && <p className="text-red-500">{errors.job.message}</p>}

        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 rounded"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          {...register("photo")}
          placeholder="URL Foto"
          className="border p-2 rounded"
        />

        <textarea
          {...register("bio")}
          placeholder="Bio"
          className="border p-2 rounded"
        />
        {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}

        <select {...register("status")} className="border p-2 rounded">
          <option value="">Pilih Status</option>
          <option value="active">Aktif</option>
          <option value="inactive">Nonaktif</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}

        <button className="bg-red-600 text-white py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}