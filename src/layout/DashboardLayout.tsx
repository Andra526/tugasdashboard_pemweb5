import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* SIDEBAR MERAH (UTAMA) */}
      <aside className="w-64 bg-[#7A1C3D] text-white fixed h-full flex flex-col p-6 z-20">
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-bold tracking-tight">INVOFEST</h2>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { name: 'Dashboard', path: '/dashboard' },
            { name: 'Category Event', path: '/dashboard/kategori' },
            { name: 'Event', path: '/dashboard/event' },
            { name: 'Pembicara', path: '/dashboard/pembicara' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-3 text-sm transition-all rounded-lg ${
                isActive(item.path)
                  ? 'bg-white/10 font-bold opacity-100 border border-white/20' // Gaya Kotak Saat Aktif
                  : 'opacity-60 hover:opacity-100 hover:bg-white/5' // Gaya Hover
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

          <div className="pt-6 border-t border-rose-800/30">
  <button 
    onClick={() => navigate('/login')}
    className="flex w-full items-center gap-3 px-4 py-3 text-sm transition-all rounded-lg opacity-60 hover:opacity-100 hover:bg-white/10 hover:border hover:border-white/20"
  >
    {/* Ikon SVG Keluar */}
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2} 
      stroke="currentColor" 
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
    
    <span className="font-medium">Keluar</span>
  </button>
</div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 ml-64 bg-[#FDFDFD]">
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-10 border-b border-gray-100">
          <div className="text-[10px] font-medium text-gray-400">
            Dashboard / <span className="text-gray-900 font-bold uppercase tracking-wider">
              {location.pathname.split('/').filter(p => p !== 'dashboard' && p !== '').pop() || 'Overview'}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-gray-800 leading-none">ANDRAA</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#5a3a62] flex items-center justify-center text-white text-[11px] font-bold ring-2 ring-rose-50">
              
            </div>
          </div>
        </header>

        {/* Konten */}
        <main className="p-10">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}