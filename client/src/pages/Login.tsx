// src/pages/Login.tsx
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="h-screen grid place-items-center">
      <button
        onClick={() => login("testuser@gmail.com", "password123")}
        className="px-6 py-3 bg-black text-white rounded"
      >
        Login (Demo)
      </button>
    </div>
  );
}
