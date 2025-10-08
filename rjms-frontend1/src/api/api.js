import axios from 'axios';

const API_ROOT = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token from localStorage for each request (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

// Helper wrappers matching existing code expectations
export const fetchJournals = async () => {
  const res = await api.get('/journals');
  return res.data;
};

export const fetchJournalById = async (id) => {
  const res = await api.get(`/journals/${id}`);
  return res.data;
};

export const createJournal = async (journal) => {
  const res = await api.post('/journals', journal);
  return res.data;
};

export const updateJournal = async (id, journal) => {
  const res = await api.put(`/journals/${id}`, journal);
  return res.data;
};

export const deleteJournal = async (id) => {
  const res = await api.delete(`/journals/${id}`);
  return res.data;
};

export const searchJournals = async (query) => {
  const res = await api.get(`/journals/search`, { params: { query } });
  return res.data;
};

// Default export axios instance for generic calls like auth
export default api;

