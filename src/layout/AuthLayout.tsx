import { Outlet, Link } from "react-router-dom";
import { 
  Home, 
  Info, 
  Users, 
  Briefcase, 
  Mic2, 
  LogIn 
} from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen w-full bg-[#F1F5F9] font-sans relative">
      <header className="w-full bg-white shadow-sm py-4 px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center">
          <img 
            src="https://www.invofest-harkatnegeri.com/assets/nav-logo.png" 
            alt="logo" 
            className="h-16" 
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-[#475569] font-medium text-[15px]">
          <Link to="/" className="flex items-center gap-2 hover:text-[#7B1D3F] transition-colors">
            <Home size={18} strokeWidth={1.5} /> Beranda
          </Link>
          <Link to="/competition" className="flex items-center gap-2 hover:text-[#7B1D3F] transition-colors">
            <Info size={18} strokeWidth={1.5} /> Competition
          </Link>
          <Link to="/seminar" className="flex items-center gap-2 hover:text-[#7B1D3F] transition-colors">
            <Users size={18} strokeWidth={1.5} /> Seminar
          </Link>
          <Link to="/workshop" className="flex items-center gap-2 hover:text-[#7B1D3F] transition-colors">
            <Briefcase size={18} strokeWidth={1.5} /> Workshop
          </Link>
          <Link to="/talkshow" className="flex items-center gap-2 hover:text-[#7B1D3F] transition-colors">
            <Mic2 size={18} strokeWidth={1.5} /> Talkshow
          </Link>
          
          <Link to="/login" className="flex items-center gap-2 text-[#7B1D3F] font-bold transition-colors ml-4">
            <LogIn size={18} strokeWidth={1.5} /> Login
          </Link>
        </nav>
      </header>

      <main className="flex flex-col items-center pt-20 pb-12 px-6">
        <div className="w-full max-w-[520px] bg-white p-10 md:p-14 rounded-[2rem] shadow-sm border border-gray-50">
          <Outlet /> 
        </div>
      </main>

      <button 
        className="fixed bottom-6 right-6 w-12 h-12 bg-[#7B1D3F] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#5a1530] transition-transform active:scale-95"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>

    </div>
  );
}