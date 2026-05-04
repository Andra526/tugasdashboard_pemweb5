import { Link } from "react-router-dom";

type Stat = {
  title: string;
  value: number;
  icon: string;
  path: string;
};

type EventItem = {
  name: string;
  category: string;
  date: string;
};

type SpeakerItem = {
  name: string;
  job: string;
};

const stats: Stat[] = [
  { title: "Kategori", value: 3, icon: "📂", path: "/dashboard/kategori" },
  { title: "Event", value: 3, icon: "📅", path: "/dashboard/event" },
  { title: "Pembicara", value: 3, icon: "🎤", path: "/dashboard/pembicara" },
  { title: "Event Aktif", value: 2, icon: "✅", path: "/dashboard/event" },
];

const latestEvents: EventItem[] = [
  { name: "Seminar AI 2025", category: "Seminar", date: "10 Jan 2026" },
  { name: "Workshop UI/UX", category: "Workshop", date: "15 Feb 2026" },
  { name: "Talkshow Startup", category: "Talkshow", date: "20 Mar 2026" },
];

const latestSpeakers: SpeakerItem[] = [
  { name: "Danang Avan M", job: "UI/UX Designer" },
  { name: "Lhuqita Fazry", job: "Software Engineer" },
  { name: "M. Dendi Purwanto", job: "Product Manager" },
];

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* HEADER SECTION */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-0.5 bg-[#7A1C3D] rounded-full" />
          <span className="text-[10px] font-bold text-[#7A1C3D] tracking-widest uppercase">Overview</span>
        </div>
        <h1 className="text-3xl font-bold text-[#1a0a10]">Dashboard</h1>
        
        <p className="text-sm text-gray-400 mt-1">Ringkasan data Invofest hari ini</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <Link to={stat.path} key={stat.title} className="block group">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 transition-all group-hover:shadow-md group-hover:border-rose-100">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.title}</span>
                <span className="text-lg opacity-50 group-hover:opacity-100 transition-opacity">{stat.icon}</span>
              </div>
              <p className="text-4xl font-bold text-gray-800">{stat.value}</p>
              <div className="h-1 w-8 bg-[#7A1C3D] rounded-full group-hover:w-12 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* BOTTOM CONTENT */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Event Terbaru */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-3 h-0.5 bg-[#7A1C3D] rounded-full" />
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Event Terbaru</h2>
          </div>
          <ul className="space-y-6">
            {latestEvents.map((item) => (
              <li key={item.name} className="flex justify-between items-center group cursor-default">
                <div>
                  <p className="text-sm font-bold text-gray-800 group-hover:text-[#7A1C3D] transition-colors">{item.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.date}</p>
                </div>
                <span className="text-[9px] font-bold bg-rose-50 text-[#7A1C3D] px-3 py-1 rounded-full uppercase tracking-wider">
                  {item.category}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pembicara Terbaru */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 mb-8">
            <span className="w-3 h-0.5 bg-[#7A1C3D] rounded-full" />
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-widest">Pembicara Terbaru</h2>
          </div>
          <ul className="space-y-6">
            {latestSpeakers.map((item) => (
              <li key={item.name} className="flex items-center gap-4 group cursor-default">
                <div className="w-10 h-10 rounded-full bg-[#7A1C3D]/5 border border-rose-100 flex items-center justify-center text-[10px] font-bold text-[#7A1C3D] group-hover:bg-[#7A1C3D] group-hover:text-white transition-all">
                  {item.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{item.name}</p>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-0.5">{item.job}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}