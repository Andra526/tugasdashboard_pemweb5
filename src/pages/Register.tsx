import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Tambahkan useNavigate
import { Loader2 } from "lucide-react";

// Tipe data disesuaikan: Hanya username (nama) dan password
type FormData = {
  username: string;
  password: string;
};

// Schema disesuaikan
const schema = z.object({
  username: z.string().min(2, "Nama harus diisi minimal 2 karakter"),
  password: z.string().min(8, "Password minimal harus 8 karakter"),
});

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi setelah sukses

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      // Ganti URL '/api/register' dengan endpoint backend Anda
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Akun Berhasil Dibuat! Silahkan Login.");
        navigate("/login"); // Arahkan kembali ke halaman login
      } else {
        alert("Gagal mendaftar. Nama mungkin sudah terpakai.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan koneksi ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Daftar Akun!</h1>
        <p className="text-gray-400 mt-3 text-base">Masukkan nama dan password Anda</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        
        {/* Input Nama (Sebagai Username) */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Nama</label>
          <input
            {...register("username")}
            disabled={isLoading}
            className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${
              errors.username ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
            }`}
            placeholder="Nama Anda"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1 pl-1">{errors.username.message}</p>}
        </div>

        {/* Input Password */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            {...register("password")}
            disabled={isLoading}
            className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${
              errors.password ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
            }`}
            placeholder="Minimal 8 karakter"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1 pl-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#832B49] text-white py-4 rounded-xl font-bold hover:bg-[#6a223b] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] disabled:bg-slate-300 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Memproses...
            </>
          ) : (
            "Daftar Sekarang"
          )}
        </button>

        <div className="text-sm text-center text-slate-500 pt-2">
          Sudah punya akun? <Link to="/login" className="text-[#7B1D3F] font-bold hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
}