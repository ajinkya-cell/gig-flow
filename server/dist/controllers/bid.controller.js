import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { getIO } from "../config/socket.js";
/* ---------------- CREATE BID ---------------- */
export const createBid = async (req, res) => {
    const { gigId, message, price } = req.body;
    if (!gigId || !message || !price) {
        return res.status(400).json({ message: "Missing fields" });
    }
    /* 1️⃣ Fetch gig */
    const gig = await Gig.findById(gigId);
    if (!gig) {
        return res.status(404).json({ message: "Gig not found" });
    }
    /* 2️⃣ Owner cannot bid on own gig */
    if (gig.ownerId.toString() === req.user.id) {
        return res.status(403).json({
            message: "You cannot bid on your own gig",
        });
    }
    /* 3️⃣ Gig must be open */
    if (gig.status !== "open") {
        return res.status(400).json({
            message: "This gig is no longer accepting bids",
        });
    }
    /* 4️⃣ Prevent duplicate bid */
    const existingBid = await Bid.findOne({
        gigId,
        freelancerId: req.user.id,
    });
    if (existingBid) {
        return res.status(409).json({ message: "You have already bid" });
    }
    /* 5️⃣ Create bid */
    const bid = await Bid.create({
        gigId,
        freelancerId: req.user.id,
        message,
        price,
    });
    res.status(201).json(bid);
};
/* ---------------- GET BIDS FOR GIG ---------------- */
export const getBidsForGig = async (req, res) => {
    const bids = await Bid.find({ gigId: req.params.gigId });
    res.json(bids);
};
/* ---------------- HIRE BID (TRANSACTION) ---------------- */
export const hireBid = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const bid = await Bid.findById(req.params.bidId).session(session);
        if (!bid || bid.status !== "pending") {
            throw new Error("Invalid bid");
        }
        const gig = await Gig.findOne({
            _id: bid.gigId,
            ownerId: req.user.id,
            status: "open",
        }).session(session);
        if (!gig) {
            throw new Error("Gig already assigned or unauthorized");
        }
        /* Assign gig */
        gig.status = "assigned";
        await gig.save({ session });
        /* Hire selected bid */
        bid.status = "hired";
        await bid.save({ session });
        /* Reject others */
        await Bid.updateMany({ gigId: gig._id, _id: { $ne: bid._id } }, { status: "rejected" }, { session });
        await session.commitTransaction();
        /* Real-time notification */
        getIO()
            .to(bid.freelancerId.toString())
            .emit("hired", { gigTitle: gig.title });
        res.json({ success: true });
    }
    catch (err) {
        await session.abortTransaction();
        res.status(400).json({ message: err.message });
    }
    finally {
        session.endSession();
    }
};
