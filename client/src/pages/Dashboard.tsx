// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import PageWrapper from "../components/layout/PageWrapper";
import GigCard from "../components/GigCard";

export default function Dashboard() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/gigs").then((res) => setGigs(res.data));
  }, []);

  return (
    <PageWrapper>
      <h1 className="text-3xl text-blue-900 font-bold mb-6">Available Gigs</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {gigs.map((gig: any) => (
          <GigCard key={gig._id} gig={gig} />
        ))}
      </div>
    </PageWrapper>
  );
}
