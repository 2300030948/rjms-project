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
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);

  const login = async (email, password) => {
    const resp = await api.post('/auth/login', { email, password });
    // Expect backend to return { token: '...', user: { ... } }
    const { token: t, user: u } = resp.data;
    setToken(t);
    setUser(u);
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
  };

  return (
    <AuthContext.Provider value={{ token, user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
