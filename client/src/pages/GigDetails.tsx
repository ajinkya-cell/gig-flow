import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

/* ---------- types ---------- */

interface Gig {
  _id: string;
  title: string;
  description: string;
  budget: number;
  ownerId: string;
  status: "open" | "assigned";
}

interface Bid {
  _id: string;
  freelancerId: string | { _id: string };
  message: string;
  price: number;
  status: "pending" | "hired" | "rejected";
}

/* ---------- component ---------- */

export default function GigDetails() {
  const { id: gigId } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [gig, setGig] = useState<Gig | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [loadingAction, setLoadingAction] = useState(false);

  /* ---------- fetch gig + bids ---------- */
  useEffect(() => {
    if (!gigId) return;

    const fetchData = async () => {
      const [gigRes, bidsRes] = await Promise.all([
        api.get(`/gigs/${gigId}`),
        api.get(`/bids/${gigId}`),
      ]);

      setGig(gigRes.data);
      setBids(bidsRes.data);
    };

    fetchData().catch(console.error);
  }, [gigId]);

  /* ---------- derived checks ---------- */

  const isOwner = useMemo(() => {
    return Boolean(user && gig && user._id === gig.ownerId);
  }, [user, gig]);

  const hasAlreadyBid = useMemo(() => {
    if (!user) return false;

    return bids.some((bid) => {
      const freelancerId =
        typeof bid.freelancerId === "string"
          ? bid.freelancerId
          : bid.freelancerId._id;

      return freelancerId === user._id;
    });
  }, [bids, user]);

  const canBid =
    user &&
    gig &&
    gig.status === "open" &&
    !isOwner &&
    !hasAlreadyBid;

  const canHire =
    user &&
    gig &&
    isOwner &&
    gig.status === "open";

  /* ---------- submit bid ---------- */

  const submitBid = async () => {
    if (!gigId) return;

    try {
      setLoadingAction(true);
      const res = await api.post("/bids", {
        gigId,
        message,
        price,
      });

      setBids((prev) => [...prev, res.data]);
      setMessage("");
      setPrice(0);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit bid");
    } finally {
      setLoadingAction(false);
    }
  };

  /* ---------- hire bid ---------- */

  const hireBid = async (bidId: string) => {
    if (!gigId) return;

    try {
      setLoadingAction(true);
      await api.patch(`/bids/${bidId}/hire`);

      const [gigRes, bidsRes] = await Promise.all([
        api.get(`/gigs/${gigId}`),
        api.get(`/bids/${gigId}`),
      ]);

      setGig(gigRes.data);
      setBids(bidsRes.data);
    } catch (err: any) {
      alert(err.response?.data?.message || "Hiring failed");
    } finally {
      setLoadingAction(false);
    }
  };

  if (!gig) {
    return <p className="p-8">Loading...</p>;
  }

  /* ---------- UI ---------- */

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* ---------- GIG INFO ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border p-6 rounded-xl mb-8"
      >
        <h1 className="font-serif text-3xl">{gig.title}</h1>
        <p className="mt-2 opacity-70">{gig.description}</p>
        <p className="mt-4 font-mono">₹ {gig.budget}</p>
        <p className="mt-2 font-mono text-sm">Status: {gig.status}</p>
      </motion.div>

      {/* ---------- BID SECTION ---------- */}
      <div className="border p-6 rounded-xl mb-8">
        <h2 className="font-serif text-2xl mb-4">Place a Bid</h2>

        {!user && (
          <p className="text-gray-500 font-mono">
            Please log in to place a bid.
          </p>
        )}

        {user && isOwner && (
          <p className="text-red-600 font-mono">
            🚫 You cannot bid on your own gig.
          </p>
        )}

        {user && hasAlreadyBid && !isOwner && (
          <p className="text-green-600 font-mono">
            ✅ You have already placed a bid.
          </p>
        )}

        {gig.status === "assigned" && (
          <p className="text-gray-500 font-mono">
            🔒 This gig has already been assigned.
          </p>
        )}

        {canBid && (
          <>
            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Your proposal"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              placeholder="Your price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <button
              disabled={loadingAction}
              onClick={submitBid}
              className="px-5 py-2 bg-black text-white rounded disabled:opacity-50"
            >
              Submit Bid
            </button>
          </>
        )}
      </div>

      {/* ---------- BIDS LIST ---------- */}
      <h2 className="font-serif text-2xl mb-4">All Bids</h2>

      <div className="space-y-3">
        {bids.map((bid) => (
          <motion.div
            key={bid._id}
            whileHover={{ scale: 1.01 }}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p>{bid.message}</p>
              <p className="font-mono">₹ {bid.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-mono text-sm ${
                  bid.status === "pending"
                    ? "text-yellow-600"
                    : bid.status === "hired"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {bid.status}
              </span>

              {/* ---------- HIRE BUTTON ---------- */}
              {canHire && bid.status === "pending" && (
                <button
                  disabled={loadingAction}
                  onClick={() => hireBid(bid._id)}
                  className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                >
                  Hire
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
