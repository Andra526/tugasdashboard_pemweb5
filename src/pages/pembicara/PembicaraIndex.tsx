import { useState } from "react";

// Data awal default sebagai backup jika localStorage masih kosong
const initialSpeakers = [
  { id: 1, name: "Lhuqita Fazry", job: "Software Engineer", email: "lhuqita@mail.com" },
  { id: 2, name: "Danang Avan M", job: "UI/UX Designer", email: "danang@mail.com" },
  { id: 3, name: "M. Dendi Purwanto", job: "Product Manager", email: "dendi@mail.com" },
];

// Komponen Avatar pembicara
function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#7B1D3F] to-[#c9395e] text-white text-xs font-bold flex items-center justify-center shadow-sm">
      {initials}
    </div>
  );
}

export default function PembicaraIndex() {
  // 1. State utama pembicara (mengambil dari localStorage)
  const [speakers, setSpeakers] = useState(() => {
    const savedData = localStorage.getItem("invofest_speakers");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      localStorage.setItem("invofest_speakers", JSON.stringify(initialSpeakers));
      return initialSpeakers;
    }
  });

  // 2. State kontrol form Tampil/Sembunyi
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 3. State penanda: null = Tambah Baru, jika berisi angka = Sedang Edit ID tersebut
  const [editingId, setEditingId] = useState<number | null>(null);

  // 4. State value input form
  const [formData, setFormData] = useState({
    name: "",
    job: "",
    email: "",
  });

  // Handle perubahan text input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Pemicu tombol Edit
  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      job: item.job,
      email: item.email,
    });
    setIsFormOpen(true);
  };

  // Pemicu tombol Tambah Baru / Batal
  const handleAddNewClick = () => {
    setEditingId(null);
    setFormData({ name: "", job: "", email: "" });
    setIsFormOpen(!isFormOpen);
  };

  // Fungsi Hapus Data Pembicara
  const handleDelete = (id: number, name: string) => {
    const konfirmasi = window.confirm(`Apakah Anda yakin ingin menghapus pembicara "${name}"?`);
    if (konfirmasi) {
      const updatedSpeakers = speakers.filter((speaker: any) => speaker.id !== id);
      setSpeakers(updatedSpeakers);
      localStorage.setItem("invofest_speakers", JSON.stringify(updatedSpeakers));
    }
  };

  // Fungsi Submit Simpan (Handle Tambah & Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.job || !formData.email) {
      alert("Semua inputan wajib diisi!");
      return;
    }

    let updatedSpeakers = [...speakers];

    if (editingId !== null) {
      // PROSES EDIT DATA
      updatedSpeakers = speakers.map((speaker: any) =>
        speaker.id === editingId ? { ...speaker, ...formData } : speaker
      );
      alert("Data pembicara berhasil diperbarui!");
    } else {
      // PROSES TAMBAH DATA
      const newSpeaker = {
        id: Date.now(),
        ...formData,
      };
      updatedSpeakers = [...speakers, newSpeaker];
      alert("Pembicara baru berhasil ditambahkan!");
    }

    // Simpan ke state dan localStorage
    setSpeakers(updatedSpeakers);
    localStorage.setItem("invofest_speakers", JSON.stringify(updatedSpeakers));

    // Reset Form
    setFormData({ name: "", job: "", email: "" });
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <div className="px-7 py-8 max-w-5xl mx-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-0.5 bg-[#7B1D3F] rounded-full inline-block" />
            <span className="text-[10px] font-semibold text-[#7B1D3F] tracking-widest uppercase">
              Manajemen
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a0a10] tracking-tight">Pembicara</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola pembicara event Invofest</p>
        </div>

        <button
          onClick={handleAddNewClick}
          className="flex items-center gap-1.5 bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <span className="text-base leading-none">{isFormOpen && editingId === null ? "×" : "+"}</span>
          {isFormOpen && editingId === null ? "Batal" : "Tambah Pembicara"}
        </button>
      </div>

      {/* PANEL FORM INLINE (TAMBAH / EDIT) */}
      {isFormOpen && (
        <div className="mb-6 p-5 bg-white border border-gray-100 shadow-sm rounded-xl animate-fade-in">
          <h2 className="text-base font-bold text-[#1a0a10] mb-4">
            {editingId !== null ? "📝 Edit Data Pembicara" : "✨ Form Tambah Pembicara Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Contoh: Lhuqita Fazry"
                className="w-full text-sm border border-gray-200 p-2 rounded-lg outline-none focus:border-[#7B1D3F]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Pekerjaan / Instansi</label>
              <input
                type="text"
                name="job"
                value={formData.job}
                onChange={handleInputChange}
                placeholder="Contoh: UI/UX Designer"
                className="w-full text-sm border border-gray-200 p-2 rounded-lg outline-none focus:border-[#7B1D3F]"
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@mail.com"
                  className="w-full text-sm border border-gray-200 p-2 rounded-lg outline-none focus:border-[#7B1D3F]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-5 h-[38px] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {editingId !== null ? "Simpan" : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["No", "Pembicara", "Pekerjaan", "Email", "Aksi"].map((h) => (
                <th
                  key={h}
                  className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 py-2.5 text-left whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {speakers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">
                  Tidak ada data pembicara.
                </td>
              </tr>
            ) : (
              speakers.map((item: any, index: number) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 hover:bg-rose-50/40 transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm text-gray-300 w-10">{index + 1}</td>

                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={item.name} />
                      <span className="text-sm font-semibold text-[#1a0a10]">{item.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3.5">
                    <span className="text-xs font-medium bg-rose-50 text-[#7B1D3F] px-2.5 py-1 rounded-full">
                      {item.job}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-xs text-gray-500">{item.email}</td>

                  <td className="px-4 py-3.5">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id, item.name)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="px-4 py-3 border-t border-gray-50">
          <span className="text-xs text-gray-300">Menampilkan {speakers.length} pembicara</span>
        </div>
      </div>
    </div>
  );
}