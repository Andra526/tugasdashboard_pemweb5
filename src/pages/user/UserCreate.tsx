import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userService'; // Pastikan fungsi ini sudah ada di userService

export default function UserCreate() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData); // Mengirim data ke backend
      alert("User berhasil ditambahkan!");
      navigate('/dashboard/user'); // Arahkan kembali ke halaman daftar user
    } catch (error) {
      alert("Gagal menambahkan user");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Tambah User Baru</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input 
            className="border p-2 w-full rounded" 
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input 
            className="border p-2 w-full rounded" 
            type="password"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">
          Simpan User
        </button>
      </form>
    </div>
  );
}