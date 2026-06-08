import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; 
import Input from "../component/ui/Input";

type FormData = {
  username: string;
  password: string;
};

const schema = z.object({
  username: z.string().min(2, "Nama minimal 2 karakter"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Mengambil pesan error dari backend
      const result = await response.json();

      if (response.ok) {
        alert("Login Berhasil!");
        login(data.username);
        navigate("/dashboard");
      } else {
        // Menampilkan pesan spesifik dari backend (misal: "Password salah")
        alert(result.error || "Nama atau Password salah!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Gagal terhubung ke server. Pastikan backend sudah berjalan!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Selamat Datang!</h1>
        <p className="text-gray-400 mt-3 text-base">Silakan login menggunakan Nama Anda</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6" noValidate>
        <Input 
          label="Nama" 
          name="username" 
          register={register} 
          error={errors.username?.message}
          placeholder="Masukkan Nama Anda"
        />

        <Input 
          label="Password" 
          name="password" 
          type="password" 
          register={register} 
          error={errors.password?.message}
          placeholder="........"
        />

        <div className="pt-2 flex flex-col gap-4">
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#7B1D3F] text-white py-4 rounded-xl font-bold hover:bg-[#5a1530] transition-all disabled:bg-gray-300"
          >
            {isLoading ? "Memproses..." : "Login"}
          </button>

          <div className="text-center text-sm text-slate-600">
            Belum punya akun?{" "}
            <Link to="/register" className="text-[#7B1D3F] font-bold hover:underline">
              Daftar Sekarang
            </Link>
          </div>

          <button 
            type="button"
            onClick={() => navigate("/")}
            className="w-full bg-white text-[#7B1D3F] py-4 rounded-xl font-bold border-2 border-[#7B1D3F] hover:bg-rose-50 transition-all shadow-sm"
          >
            Kembali ke Beranda
          </button>
        </div>
      </form>
    </div>
  );
}