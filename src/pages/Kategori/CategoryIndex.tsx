import { useState } from "react";
import Input from "../../component/ui/Input";

type Category = {
  id: number;
  name: string;
  description: string;
};

// Data awal default jika localStorage masih kosong
const initialCategories: Category[] = [
  { id: 1, name: "Seminar", description: "Acara penyampaian materi secara formal" },
  { id: 2, name: "Workshop", description: "Pelatihan praktik interaktif secara langsung" },
  { id: 3, name: "Competition", description: "Ajang perlombaan atau kompetisi bakat" },
];

const TABLE_HEADERS = ["No", "Nama Kategori", "Deskripsi", "Aksi"];

export default function CategoryIndex() {
  // 1. State utama kategori (mengambil dari localStorage)
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedData = localStorage.getItem("invofest_categories");
    if (savedData) {
      return JSON.parse(savedData);
    } else {
      localStorage.setItem("invofest_categories", JSON.stringify(initialCategories));
      return initialCategories;
    }
  });

  // 2. State kontrol form Tampil/Sembunyi
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 3. State penanda: null = Tambah Baru, jika berisi angka = Sedang Edit ID tersebut
  const [editingId, setEditingId] = useState<number | null>(null);

  // 4. State value input form sederhana (tanpa react-hook-form agar mudah dikontrol inline)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Handle perubahan teks input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Pemicu tombol Edit
  const handleEditClick = (item: Category) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      description: item.description,
    });
    setIsFormOpen(true);
  };

  // Pemicu tombol Tambah Baru / Batal
  const handleAddNewClick = () => {
    setEditingId(null);
    setFormData({ name: "", description: "" });
    setIsFormOpen(!isFormOpen);
  };

  // Fungsi Hapus Data Kategori
  const handleDelete = (id: number, name: string) => {
    const konfirmasi = window.confirm(`Apakah Anda yakin ingin menghapus kategori "${name}"?`);
    if (konfirmasi) {
      const updatedCategories = categories.filter((cat) => cat.id !== id);
      setCategories(updatedCategories);
      localStorage.setItem("invofest_categories", JSON.stringify(updatedCategories));
    }
  };

  // Fungsi Submit Simpan (Handle Tambah & Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      alert("Nama kategori minimal 3 karakter!");
      return;
    }
    if (formData.description.length < 5) {
      alert("Deskripsi minimal 5 karakter!");
      return;
    }

    let updatedCategories = [...categories];

    if (editingId !== null) {
      // PROSES EDIT DATA
      updatedCategories = categories.map((cat) =>
        cat.id === editingId ? { ...cat, ...formData } : cat
      );
      alert("Kategori berhasil diperbarui!");
    } else {
      // PROSES TAMBAH DATA
      const newCategory: Category = {
        id: Date.now(),
        ...formData,
      };
      updatedCategories = [...categories, newCategory];
      alert("Kategori baru berhasil ditambahkan!");
    }

    // Simpan ke state dan localStorage
    setCategories(updatedCategories);
    localStorage.setItem("invofest_categories", JSON.stringify(updatedCategories));

    // Reset Form
    setFormData({ name: "", description: "" });
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
          <h1 className="text-2xl font-bold text-[#1a0a10] tracking-tight">Kategori</h1>
          <p className="text-sm text-gray-400 mt-1">Kelola kategori event Invofest</p>
        </div>

        <button
          onClick={handleAddNewClick}
          className="flex items-center gap-1.5 bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm cursor-pointer"
        >
          <span className="text-lg leading-none">{isFormOpen && editingId === null ? "×" : "+"}</span>
          {isFormOpen && editingId === null ? "Batal" : "Tambah Kategori"}
        </button>
      </div>

      {/* PANEL FORM INLINE (TAMBAH / EDIT) */}
      {isFormOpen && (
        <div className="mb-6 p-5 bg-white border border-gray-100 shadow-sm rounded-xl transition-all">
          <h2 className="text-base font-bold text-[#1a0a10] mb-4">
            {editingId !== null ? "📝 Edit Kategori" : "✨ Tambah Kategori Baru"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Nama Kategori</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Contoh: Seminar"
                className="w-full text-sm border border-gray-200 p-2.5 rounded-lg outline-none focus:border-[#7B1D3F]"
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">Deskripsi</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Contoh: Acara pemaparan materi..."
                  className="w-full text-sm border border-gray-200 p-2.5 rounded-lg outline-none focus:border-[#7B1D3F]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#7B1D3F] hover:bg-[#9e2550] text-white text-sm font-semibold px-5 h-[42px] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {editingId !== null ? "Simpan" : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE CARD */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {TABLE_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 px-4 py-3 text-left whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {categories.map((item, index) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-rose-50/40 transition-colors">
                  <td className="px-4 py-3.5 text-sm text-gray-400 w-10">{index + 1}</td>

                  <td className="px-4 py-3.5 text-sm font-semibold text-[#1a0a10]">
                    {item.name}
                  </td>

                  <td className="px-4 py-3.5 text-sm text-gray-500">
                    {item.description || "-"}
                  </td>

                  <td className="px-4 py-3.5 w-32">
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {categories.length === 0 && (
          <div className="flex flex-col items-center justify-center py-14 gap-2">
            <span className="text-3xl">🗂️</span>
            <p className="text-sm text-gray-400 font-medium">Belum ada kategori</p>
            <p className="text-xs text-gray-300">Tambah kategori pertama kamu</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="px-4 py-3 border-t border-gray-50 bg-gray-50/30">
          <span className="text-xs text-gray-400">
            Menampilkan <b>{categories.length}</b> kategori terdaftar
          </span>
        </div>
      </div>
    </div>
  );
}