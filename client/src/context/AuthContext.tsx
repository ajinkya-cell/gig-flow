// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
   loading: boolean; // 
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
console.log("hii")
 const [loading, setLoading] = useState(true); // ✅ THIS WAS MISSING

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get<User>("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false); // ✅ IMPORTANT
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    setUser(res.data);
    return res.data;
  } catch (err) {
    console.error("AuthContext login error:", err);
    throw err; // VERY IMPORTANT
  }
};


  const register = async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/register", { name, email, password });
    setUser(res.data);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,loading,    login , register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
