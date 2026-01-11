// src/components/GigCard.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function GigCard({ gig }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border p-5 rounded-xl bg-white shadow"
    >
      <h3 className="font-serif text-xl">{gig.title}</h3>
      <p className="text-sm opacity-70">{gig.description}</p>
      <p className="mt-2 font-mono">₹ {gig.budget}</p>
      <Link to={`/gigs/${gig._id}`} className="text-blue-600 text-sm">
        View →
      </Link>
    </motion.div>
  );
}
