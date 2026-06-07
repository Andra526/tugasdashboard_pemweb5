import axios from 'axios';

// Tambahkan created_at agar TypeScript tidak komplain saat mapping di tabel
export interface User {
  id?: number;
  username: string;
  password?: string;
  created_at?: string; // Tambahkan ini agar sesuai dengan hasil dari API/Database
}

const API_URL = 'http://localhost:3000/api/users'; 

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUsers = () => apiClient.get('');
export const getUserById = (id: string | number) => apiClient.get(`/${id}`);
export const createUser = (data: User) => apiClient.post('', data);
export const updateUser = (id: string | number, data: User) => apiClient.put(`/${id}`, data);
export const deleteUser = (id: string | number) => apiClient.delete(`/${id}`);