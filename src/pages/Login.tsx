import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; 
import Input from "../component/ui/Input";

type FormData = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z.string().email("Format email tidak valid").min(1, "Email harus diisi"),
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
      
      if (data.email && data.password) {
        alert("Login Berhasil!");
        login(data.email); 
        navigate("/dashboard");
      } else {
        alert("Login gagal, silakan periksa kembali data anda");
      }
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Selamat Datang!</h1>
        <p className="text-gray-400 mt-3 text-base">Silakan login untuk melanjutkan</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6" noValidate>
        <Input 
          label="Email" 
          name="email" 
          register={register} 
          error={errors.email?.message}
          placeholder="email@anda.com"
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

        <div className="text-sm text-center text-slate-500 pt-2">
          Belum punya akun? <Link to="/register" className="text-[#7B1D3F] font-bold hover:underline">Daftar</Link>
        </div>
      </form>
    </div>
  );
}