import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    username: z.string().min(2, "Username harus diisi").max(100),
    email: z.string().email("Format email tidak valid").min(1, "Email harus diisi"),
    password: z.string().min(8, "Password minimal harus 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    setIsLoading(true);

    // Simulasi proses registrasi akun
    setTimeout(() => {
      setIsLoading(false);
      console.log("Data Register:", data);
      
      alert("Akun Berhasil Dibuat! Silahkan Login.");
      
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#7B1D3F]">Daftar Akun!</h1>
        <p className="text-gray-400 mt-3 text-base">Lengkapi data untuk bergabung</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        
        {/* Input Username */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
          <input
            {...register("username")}
            disabled={isLoading}
            className={`w-full px-4 py-3 border rounded-xl outline-none transition-all placeholder:text-slate-300 ${
              errors.username ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
            }`}
            placeholder="Username Anda"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1 pl-1">{errors.username.message}</p>}
        </div>

        {/* Input Email */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
          <input
            type="email"
            {...register("email")}
            disabled={isLoading}
            className={`w-full px-4 py-3 border rounded-xl outline-none transition-all placeholder:text-slate-300 ${
              errors.email ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
            }`}
            placeholder="email@anda.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1 pl-1">{errors.email.message}</p>}
        </div>

        {/* Input Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all placeholder:text-slate-300 ${
                errors.password ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
              }`}
              placeholder="........"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 pl-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Konfirmasi</label>
            <input
              type="password"
              {...register("confirmPassword")}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all placeholder:text-slate-300 ${
                errors.confirmPassword ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-[#7B1D3F]"
              }`}
              placeholder="........"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 pl-1">{errors.confirmPassword.message}</p>}
          </div>
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