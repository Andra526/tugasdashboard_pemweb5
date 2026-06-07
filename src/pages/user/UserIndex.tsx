import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/userService';

export default function UserIndex() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      console.log("Data dari API:", response.data); // Debugging: Cek isi data di console
      setUsers(response.data); 
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        alert("Gagal menghapus user");
      }
    }
  };

  // Fungsi pembantu untuk memformat tanggal
  const formatDate = (dateValue: any) => {
    if (!dateValue) return '-';
    const date = new Date(dateValue);
    // Cek apakah tanggal valid
    if (isNaN(date.getTime())) return '-';
    
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manajemen User</h1>
          <p className="text-slate-500">Kelola data user Invofest</p>
        </div>
        <Link 
          to="/dashboard/user/create" 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + Tambah User
        </Link>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">NO</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">USERNAME</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">DIBUAT PADA</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">AKSI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 text-sm text-slate-600">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{user.username}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {/* Menggunakan fungsi formatDate untuk menangani kedua kemungkinan nama key */}
                    {formatDate(user.created_at || user.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <Link 
                        to={`/dashboard/user/edit/${user.id}`} 
                        className="text-amber-600 hover:text-amber-700 font-medium mr-2"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(user.id)} 
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-slate-500">Tidak ada data user.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}