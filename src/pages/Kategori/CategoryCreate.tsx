import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../component/ui/Input"; 

const categorySchema = z.object({
  name: z.string().min(3, "Nama kategori minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoryCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log("Data kategori:", data);
    alert("Kategori berhasil dibuat!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow bg-white">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-2 text-[#1a0a10]">Tambah Kategori Event</h1>
      <p className="text-sm text-gray-500 mb-6">
        Digunakan untuk mengelompokkan event seperti Seminar, Workshop, dll.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        
        {/* Nama Kategori */}
        <Input
          label="Nama Kategori"
          name="name"
          register={register}
          error={errors.name?.message}
          placeholder="Contoh: Seminar"
        />

        {/* Deskripsi */}
        <Input
          label="Deskripsi"
          name="description"
          register={register}
          error={errors.description?.message}
          placeholder="Deskripsi kategori"
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition font-semibold mt-2 shadow-sm"
        >
          Simpan Kategori
        </button>
      </form>
    </div>
  );
}