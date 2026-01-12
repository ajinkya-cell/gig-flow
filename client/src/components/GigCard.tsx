// src/components/GigCard.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function GigCard({ gig }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-5 border rounded-xl bg-white shadow"
    >
      <h2 className="text-xl font-semibold">{gig.title}</h2>
      <p className="text-gray-600 line-clamp-2">{gig.description}</p>
      <p className="mt-2 font-bold">₹{gig.budget}</p>
      <Link
        to={`/gigs/${gig._id}`}
        className="text-blue-600 mt-3 inline-block"
      >
        View & Bid →
      </Link>
    </motion.div>
  );
}
