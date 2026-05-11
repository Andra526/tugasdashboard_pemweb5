import React from "react";
import type { UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  register: any; 
  error?: string;
  type?: string; 
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  name, 
  register, 
  error, 
  type = "text", 
  placeholder 
}) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={name} className="font-semibold mb-1 text-[#1a0a10]">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`border p-2 rounded outline-none transition focus:ring-2 ${
          error 
            ? "border-red-500 focus:ring-red-200" 
            : "border-gray-300 focus:ring-red-500"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;