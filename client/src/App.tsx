// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gigs from "./pages/Gigs";
import Login from "./pages/Login";
import GigDetails from "./pages/GigDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
