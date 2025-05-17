// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthStatus = '0' | '1' | '2' | null;

type AuthContextType = {
  token: string | null;
  status: AuthStatus;
  username: string | null;
  login: (token: string, status: AuthStatus, username: string) => void;
  logout: () => void;
  checkTokenValid: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>(null);
  const [username, setUsername] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedStatus = localStorage.getItem('status') as AuthStatus;
    const storedUsername = localStorage.getItem('username');

    if (storedToken && storedStatus && storedUsername) {
      setToken(storedToken);
      setStatus(storedStatus);
      setUsername(storedUsername);
    }
  }, []);

  // 登录
  const login = (newToken: string, newStatus: AuthStatus, newUsername: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('status', newStatus || '');
    localStorage.setItem('username', newUsername);

    setToken(newToken);
    setStatus(newStatus);
    setUsername(newUsername);
    // navigate('/mine');
  };

  // 退出登录
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('status');
    localStorage.removeItem('username');
    setToken(null);
    setStatus(null);
    setUsername(null);
    navigate('/login');
  };

  // 检查token是否过期
  const checkTokenValid = () => {
    if (!token || !status || !username) {
      logout();
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider value={{ token, status, username, login, logout, checkTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth 必须在 AuthProvider 中使用');
  return ctx;
};
