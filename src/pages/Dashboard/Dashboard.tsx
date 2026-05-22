import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

type Stat = {
  title: string;
  value: number;
  icon: string;
  path: string;
  color: string;
  bgIcon: string;
};

type EventItem = {
  id?: number;
  name: string;
  category: string;
  date: string;
};

type SpeakerItem = {
  id?: number;
  name: string;
  job: string;
  email?: string;
};

type CategoryItem = {
  id: number;
  name: string;
  description: string;
};

export default function Dashboard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [speakers, setSpeakers] = useState<SpeakerItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    // Ambil data Event
    const savedEvents = localStorage.getItem("invofest_events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const defaultEvents = [
        { id: 1, name: "Seminar AI", category: "Seminar", date: "2026-01-10" },
        { id: 2, name: "Workshop React", category: "Workshop", date: "2026-02-15" },
        { id: 3, name: "Talkshow Startup", category: "Talkshow", date: "2026-03-20" },
      ];
      setEvents(defaultEvents);
      localStorage.setItem("invofest_events", JSON.stringify(defaultEvents));
    }

    // Ambil data Pembicara
    const savedSpeakers = localStorage.getItem("invofest_speakers");
    if (savedSpeakers) {
      setSpeakers(JSON.parse(savedSpeakers));
    } else {
      const defaultSpeakers = [
        { id: 1, name: "Lhuqita Fazry", job: "Software Engineer" },
        { id: 2, name: "Danang Avan M", job: "UI/UX Designer" },
        { id: 3, name: "M. Dendi Purwanto", job: "Product Manager" },
      ];
      setSpeakers(defaultSpeakers);
      localStorage.setItem("invofest_speakers", JSON.stringify(defaultSpeakers));
    }

    // Ambil data Kategori
    const savedCategories = localStorage.getItem("invofest_categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      const defaultCategories = [
        { id: 1, name: "Seminar", description: "Acara penyampaian materi" },
        { id: 2, name: "Workshop", description: "Pelatihan praktik interaktif" },
        { id: 3, name: "Competition", description: "Ajang perlombaan" },
      ];
      setCategories(defaultCategories);
      localStorage.setItem("invofest_categories", JSON.stringify(defaultCategories));
    }
  }, []);

  // Ambil data 3 teratas yang paling baru ditambahkan
  const latestEvents = [...events].reverse().slice(0, 3);
  const latestSpeakers = [...speakers].reverse().slice(0, 3);

  // Konfigurasi style stats card yang lebih elegan
  const stats: Stat[] = [
    { title: "Kategori", value: categories.length, icon: "📂", path: "/dashboard/kategori", color: "text-amber-600", bgIcon: "bg-amber-50" },
    { title: "Total Event", value: events.length, icon: "📅", path: "/dashboard/event", color: "text-rose-600", bgIcon: "bg-rose-50" },
    { title: "Pembicara", value: speakers.length, icon: "🎤", path: "/dashboard/pembicara", color: "text-purple-600", bgIcon: "bg-purple-50" },
    { title: "Event Aktif", value: events.length, icon: "✨", path: "/dashboard/event", color: "text-emerald-600", bgIcon: "bg-emerald-50" },
  ];

  const formatDate = (dateStr: string) => {
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return dateStr;
      return dateObj.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 min-h-screen bg-gray-50/50">
      {/* HEADER SECTION */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-0.5 bg-[#7A1C3D] rounded-full" />
            <span className="text-[10px] font-bold text-[#7A1C3D] tracking-widest uppercase">Overview Platform</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-0.5">Ringkasan aktivitas dan data analytics Invofest</p>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link to={stat.path} key={stat.title} className="block group">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-[0_10px_20px_-5px_rgba(122,28,61,0.08)] group-hover:border-rose-100/80">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.title}</span>
                  <p className="text-4xl font-extrabold text-gray-800 tracking-tight mt-1">{stat.value}</p>
                </div>
                <div className={`w-11 h-11 ${stat.bgIcon} ${stat.color} rounded-xl flex items-center justify-center text-xl shadow-inner transition-transform group-hover:scale-110 duration-300`}>
                  {stat.icon}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1 pt-2 border-t border-gray-50">
                <span className="text-[11px] font-medium text-gray-400 group-hover:text-[#7A1C3D] transition-colors">Lihat Detail</span>
                <span className="text-xs text-gray-300 group-hover:text-[#7A1C3D] transition-all group-hover:translate-x-1">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* BOTTOM CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card: Event Terbaru */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#7A1C3D] rounded-full" />
              <h2 className="text-base font-bold text-gray-800 tracking-tight">Event Terbaru</h2>
            </div>
            <Link to="/dashboard/event" className="text-xs font-semibold text-[#7A1C3D] hover:underline">
              Semua Event
            </Link>
          </div>
          
          {latestEvents.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-2xl block mb-2">📅</span>
              <p className="text-sm text-gray-400 font-medium">Belum ada data event.</p>
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-50">
                {latestEvents.map((item, index) => (
                  <li key={index} className="py-4 flex items-center justify-between group transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#7A1C3D]/40 group-hover:bg-[#7A1C3D] transition-colors" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#7A1C3D] transition-colors line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1.5">
                          <span>🕒</span> {formatDate(item.date)}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-rose-50 border border-rose-100/50 text-[#7A1C3D] px-3 py-1 rounded-lg uppercase tracking-wider">
                      {item.category}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Card: Pembicara Terbaru */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_4px_12px_-5px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-purple-600 rounded-full" />
              <h2 className="text-base font-bold text-gray-800 tracking-tight">Pembicara Terbaru</h2>
            </div>
            <Link to="/dashboard/pembicara" className="text-xs font-semibold text-purple-600 hover:underline">
              Semua Pembicara
            </Link>
          </div>

          {latestSpeakers.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-2xl block mb-2">🎤</span>
              <p className="text-sm text-gray-400 font-medium">Belum ada data pembicara.</p>
            </div>
          ) : (
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-50">
                {latestSpeakers.map((item, index) => (
                  <li key={index} className="py-3.5 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7A1C3D]/10 to-purple-600/5 border border-rose-100 flex items-center justify-center text-[11px] font-bold text-[#7A1C3D] group-hover:from-[#7A1C3D] group-hover:to-[#7A1C3D] group-hover:text-white transition-all duration-300 uppercase shadow-sm">
                        {item.name ? item.name.split(' ').map(n => n[0]).join('').slice(0, 2) : "??"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#7A1C3D] transition-colors">{item.name}</p>
                        <p className="text-[11px] text-gray-400 font-medium tracking-wide mt-0.5 uppercase">{item.job}</p>
                      </div>
                    </div>
                    {item.email && (
                      <span className="text-[11px] text-gray-400 bg-gray-50 px-2.5 py-1 rounded-md max-w-[150px] truncate hidden sm:inline-block">
                        {item.email}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}