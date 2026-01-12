// src/pages/CreateGig.tsx
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function CreateGig() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");

  const submitGig = async () => {
    await api.post("/gigs", {
      title,
      description,
      budget: Number(budget),
    });
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xl mx-auto p-6"
    >
      <h1 className="text-2xl font-bold mb-4">Post a Gig</h1>

      <input
        className="w-full border p-2 mb-3"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full border p-2 mb-3"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full border p-2 mb-4"
        placeholder="Budget"
        onChange={(e) => setBudget(e.target.value)}
      />

      <button onClick={submitGig} className="bg-black text-white px-6 py-2 rounded">
        Create Gig
      </button>
    </motion.div>
  );
}
