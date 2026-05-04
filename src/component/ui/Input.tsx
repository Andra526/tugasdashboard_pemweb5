import React from "react";

interface InputProps {
  label: string;
  name: string;
  register: any; 
  error?: string;
  type?: string; 
  placeholder?: string; // <--- Tambahkan ini agar tidak error
}

const Input: React.FC<InputProps> = ({ 
  label, 
  name, 
  register, 
  error, 
  type = "text", 
  placeholder // <--- Ambil dari props
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="font-semibold mb-1">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder} // <--- Pasang di atribut input
        {...register(name)}
        className={`border p-2 rounded ${error ? "border-red-500" : "border-gray-300"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;