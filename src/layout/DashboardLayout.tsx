import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ListFilter, CalendarDays, Users, LogOut, ChevronRight } from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Category Event', path: '/dashboard/kategori', icon: ListFilter },
    { name: 'Event', path: '/dashboard/event', icon: CalendarDays },
    { name: 'Pembicara', path: '/dashboard/pembicara', icon: Users },
  ];

  const isActive = (path: string) => {
    return path === '/dashboard' ? location.pathname === path : location.pathname.startsWith(path);
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* SIDEBAR: Midnight Theme */}
      <aside className="w-72 bg-[#0F172A] text-slate-300 fixed h-full flex flex-col p-6 shadow-2xl border-r border-slate-800/50">
        <div className="mb-12 px-2 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">I</div>
          <h2 className="text-xl font-bold text-white tracking-wider">INVOFEST</h2>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all rounded-xl ${
                  active
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                    : 'hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors border-t border-slate-800 mt-auto"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-72">
        <header className="h-20 bg-white/50 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="text-xs">Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-semibold capitalize">
              {location.pathname.split('/').pop() || 'Overview'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 leading-none">ANDRAA</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 min-h-[calc(100vh-140px)]">
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
}