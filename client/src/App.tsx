"use client"
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/AuthContext";
import { useSocket } from "./hooks/useSocket";
import Navbar from "./components/Navbar";

export default function App() {
  const location = useLocation();
  const { user } = useAuth();

  // 🔌 Initialize socket only when user is logged in
  useSocket(user?._id);

  return (
    <AnimatePresence mode="wait">
      {/* key is IMPORTANT for page transition animations */}
      <div key={location.pathname} className="min-h-screen text-black bg-gray-50">
      <Navbar/>
        <AppRoutes />
      </div>
    </AnimatePresence>
  );
}
