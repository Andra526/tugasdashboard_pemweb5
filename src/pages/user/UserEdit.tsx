import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, updateUser } from '../../services/userService';

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State untuk username dan password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserById(id!);
        setUsername(res.data.username);
        setLoading(false);
      } catch (err) {
        console.error("Gagal ambil data", err);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Mengirimkan password hanya jika diisi oleh user
      const payload = password ? { username, password } : { username };
      await updateUser(id!, payload as any);
      alert("User berhasil diupdate!");
      navigate('/dashboard/user');
    } catch (err) {
      alert("Gagal update user");
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input 
            className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password Baru (Opsional)</label>
          <input 
            type="password"
            className="border p-2 w-full rounded focus:ring-2 focus:ring-indigo-500 outline-none" 
            placeholder="Kosongkan jika tidak ingin mengubah password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Update User
        </button>
      </form>
    </div>
  );
}