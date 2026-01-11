// src/pages/GigDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function GigDetails() {
  const { id } = useParams();
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    api.get(`/bids/${id}`).then(res => setBids(res.data));
  }, []);

  const hire = async (bidId: string) => {
    await api.patch(`/bids/${bidId}/hire`);
    alert("Hired!");
  };

  return (
    <div className="p-8">
      <h2 className="font-serif text-3xl mb-4">Bids</h2>
      {bids.map(b => (
        <div key={b._id} className="border p-4 mb-2 rounded">
          <p>{b.message}</p>
          <button
            onClick={() => hire(b._id)}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Hire
          </button>
        </div>
      ))}
    </div>
  );
}
