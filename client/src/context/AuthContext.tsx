import {
  createContext,
  useContext,
  useEffect,
  useState,
  
} from "react";
import api from "../api/axios";
import type { ReactNode } from "react";

/* ---------------- types ---------------- */

export interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/* ---------------- context ---------------- */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* ---------------- provider ---------------- */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---- rehydrate session on app load ---- */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get<User>("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /* ---------------- actions ---------------- */

  const login = async (email: string, password: string) => {
    await api.post("/auth/login", { email, password });
    const res = await api.get<User>("/auth/me");
    setUser(res.data);
  };

  const register = async (name: string, email: string, password: string) => {
    await api.post("/auth/register", { name, email, password });
    const res = await api.get<User>("/auth/me");
    setUser(res.data);
  };

  const logout = async () => {
    await api.post("/auth/logout"); // optional but recommended
    setUser(null);
  };

  /* ---------------- value ---------------- */

  return (
    // @ts-ignore
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
   
      {children}
    </AuthContext.Provider>
  );
};

/* ---------------- hook ---------------- */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
