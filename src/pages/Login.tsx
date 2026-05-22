import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; 
import Input from "../component/ui/Input";

// 1. Update tipe data menjadi nim
type FormData = {
  nim: string;
  password: string;
};

// 2. Update schema validasi untuk nim
const schema = z.object({
  nim: z.string().min(8, "NIM harus 8 karakter").max(8, "NIM harus 8 karakter"),
  password: z.string().min(8, "Password minimal harus 8 karakter"),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const login = useAuthStore((state) => state.login);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // 3. Validasi spesifik untuk NIM 24090003
      if (data.nim === "24090003" && data.password.length >= 8) {
        alert("Login Berhasil!");
        login(data.nim); // Menyimpan nim ke store
        navigate("/dashboard");
      } else {
        alert("NIM atau Password salah!");
      }
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Selamat Datang!</h1>
        <p className="text-gray-400 mt-3 text-base">Silakan login menggunakan NIM Anda</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6" noValidate>
        {/* 4. Update Input menjadi NIM */}
        <Input 
          label="NIM" 
          name="nim" 
          register={register} 
          error={errors.nim?.message}
          placeholder="24090003"
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