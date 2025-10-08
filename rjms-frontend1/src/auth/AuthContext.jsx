import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // ensure axios default header is set when token exists
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  // on mount, if a token exists, try to rehydrate the user from /auth/me
  useEffect(() => {
    const tryRehydrate = async () => {
      const t = localStorage.getItem('token');
      if (!t) return;
      try {
        api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
        const resp = await api.get('/auth/me');
        setUser(resp.data);
        setToken(t);
      } catch (err) {
        // token invalid or expired — clear it
        console.debug('Failed to rehydrate user', err);
        setToken(null);
        setUser(null);
      }
    };
    tryRehydrate();
  }, []);

  const login = async (email, password) => {
    const resp = await api.post('/auth/login', { email, password });
    // Expect backend to return { token: '...', user: { ... } }
    const { token: t, user: u } = resp.data;
    setToken(t);
    setUser(u);
    // set axios default Authorization immediately
    api.defaults.headers.common['Authorization'] = `Bearer ${t}`;
    return resp;
  };

  const register = async (payload) => {
    const resp = await api.post('/auth/register', payload);
    return resp;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
