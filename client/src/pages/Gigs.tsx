// src/pages/Gigs.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import GigCard from "../components/GigCard";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs").then(res => setGigs(res.data));
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {gigs.map((gig: any) => (
        <GigCard key={gig._id} gig={gig} />
      ))}
    </div>
  );
}
