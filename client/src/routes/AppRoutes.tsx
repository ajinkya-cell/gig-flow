// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import GigDetail from "../pages/GigDetails";
import CreateGig from "../pages/CreateGig";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/gigs/:id" element={<GigDetail />} />
      <Route path="/create" element={<CreateGig />} />
    </Routes>
  );
}
