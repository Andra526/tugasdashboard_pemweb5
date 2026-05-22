import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  nim: string | null; // Mengganti 'user' menjadi 'nim'
  login: (nim: string) => void; // Fungsi login sekarang menerima nim
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      nim: null,

      login: (nim: string) => 
        set({ 
          isAuthenticated: true, 
          nim: nim // Menyimpan NIM ke state global
        }),

      logout: () => 
        set({ 
          isAuthenticated: false, 
          nim: null 
        }),
    }),
    {
      name: "auth-storage", // Data ini tersimpan di LocalStorage browser
    }
  )
);