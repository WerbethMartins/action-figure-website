import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUsuario } from '../services/api';

interface AuthContextData {
  usuario: any | null;
  logado: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<any | null>(null);

  // Ao carregar o app, verifica se já tem alguém salvo no navegador
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('@App:usuario');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  // Função de Login
  async function login(email: string, senha: string) {
    try {
      const user = await loginUsuario(email, senha);
      setUsuario(user);
      localStorage.setItem('@App:usuario', JSON.stringify(user));
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Função de Logout
  function logout() {
    setUsuario(null);
    localStorage.removeItem('@App:usuario');
  }

  return (
    <AuthContext.Provider value={{ logado: !!usuario, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado 
export function useAuth() {
  return useContext(AuthContext);
}