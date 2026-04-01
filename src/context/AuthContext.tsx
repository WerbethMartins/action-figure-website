import React, { createContext, useState, useContext, useEffect } from 'react';

// APi
import { loginUsuario } from '../services/api';
import { cadastrarUsuario } from '../services/api';

interface Usuario {
  nome: string;
  email: string;
  role: 'admin' | 'cliente'; // Define os tipos de cargos possíveis
}

interface AuthContextData {
  usuario: Usuario | null;
  logado: boolean;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  cadastrar(email: string, senha: string, nome: string): Promise<boolean>; 
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Ao carregar o app, verifica se já tem alguém salvo no navegador
  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('@AnimesActions:user');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
      setLoading(false);
    }
  }, []);

  // Função de Login
  async function login(email: string, senha: string) {
    setLoading(true);
    try {
      const user = await loginUsuario(email, senha);
      setUsuario(user);
      localStorage.setItem('@AnimesActions:user', JSON.stringify(user));
    } catch (error: any) {
      throw new Error(error.message);
    }finally {
      setLoading(false);
    }
  }

  // Função de Cadastro
  async function cadastrar(email: string, senha: string, nome: string) {
    setLoading(true);
    try {
        const newUser = await cadastrarUsuario({
            nome,
            email,
            senha,
        });

        if (newUser) {
            const userData = { nome: newUser.nome, email: newUser.email };
            setUsuario(userData);
            localStorage.setItem("@AnimesActions:user", JSON.stringify(userData));
            return true;
        }
        
        return false;

    } catch (error: any) {
        console.error("Erro no cadastro:", error.message);
        throw error; 
    } finally {
      setLoading(false);
    }
  }

  // Função de Logout
  async function logout() {
    setLoading(true);

    try{
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Limpa os dados após o delay
      setUsuario(null);
      localStorage.removeItem('@AnimesActions:user');
    }catch(error){
      console.log("Erro ao deslogar", error);
    }finally {
      setLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ logado: !!usuario, usuario, loading, login, cadastrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado 
export function useAuth() {
  return useContext(AuthContext);
}