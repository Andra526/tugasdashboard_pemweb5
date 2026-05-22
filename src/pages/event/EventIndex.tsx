import { useState } from "react";

const initialEvents = [
  { id: 1, name: "Seminar AI", category: "Seminar", date: "2026-01-10" },
  { id: 2, name: "Workshop React", category: "Workshop", date: "2026-02-15" },
  { id: 3, name: "Talkshow Startup", category: "Talkshow", date: "2026-03-20" },
];

// Daftar kategori agar mudah ditambah/diubah
const KATEGORI_OPTIONS = ["Seminar", "Workshop", "Competition", "Talkshow"];

export default function EventIndex() {
  const [events, setEvents] = useState(() => {
    const savedData = localStorage.getItem("invofest_events");
    return savedData ? JSON.parse(savedData) : initialEvents;
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", category: "", date: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    setFormData({ name: item.name, category: item.category, date: item.date });
    setIsFormOpen(true);
  };

  const handleAddNewClick = () => {
    setEditingId(null);
    setFormData({ name: "", category: "", date: "" });
    setIsFormOpen(!isFormOpen);
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Yakin ingin menghapus event "${name}"?`)) {
      const updated = events.filter((e: any) => e.id !== id);
      setEvents(updated);
      localStorage.setItem("invofest_events", JSON.stringify(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.date) return alert("Wajib diisi semua!");

    let updatedEvents;
    if (editingId !== null) {
      updatedEvents = events.map((e: any) => (e.id === editingId ? { ...e, ...formData } : e));
    } else {
      updatedEvents = [...events, { id: Date.now(), ...formData }];
    }

    setEvents(updatedEvents);
    localStorage.setItem("invofest_events", JSON.stringify(updatedEvents));
    setFormData({ name: "", category: "", date: "" });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="px-7 py-8 max-w-5xl mx-auto min-h-screen">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Manajemen Event</h1>
          <p className="text-gray-500 mt-1">Atur agenda kegiatan Invofest dengan mudah</p>
        </div>
        <button
          onClick={handleAddNewClick}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-gray-200"
        >
          {isFormOpen ? "Batal" : "+ Tambah Event"}
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8 p-6 bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            {editingId !== null ? "📝 Edit Event" : "✨ Tambah Event Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nama Event" 
              className="w-full bg-white border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7B1D3F]/20 focus:border-[#7B1D3F]" />
            
            <select name="category" value={formData.category} onChange={handleInputChange} 
              className="w-full bg-white border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7B1D3F]/20 focus:border-[#7B1D3F]">
              <option value="">-- Kategori --</option>
              {KATEGORI_OPTIONS.map((kat) => (
                <option key={kat} value={kat}>{kat}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} 
                className="w-full bg-white border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#7B1D3F]/20 focus:border-[#7B1D3F]" />
              <button type="submit" className="bg-[#7B1D3F] text-white px-6 rounded-xl font-semibold hover:bg-[#5e1630] transition-all">
                {editingId !== null ? "Simpan" : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              {["No", "Nama Event", "Kategori", "Tanggal", "Aksi"].map((h) => (
                <th key={h} className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-6 py-4 text-left">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {events.map((item: any, index: number) => (
              <tr key={item.id} className="group hover:bg-rose-50/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-400">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-rose-100/50 text-[#7B1D3F] text-[11px] font-bold rounded-lg border border-rose-200/50">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                  {new Date(item.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(item)} className="text-xs font-semibold px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all">Edit</button>
                    <button onClick={() => handleDelete(item.id, item.name)} className="text-xs font-semibold px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}