// src/controllers/bid.controller.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";
import { getIO } from "../config/socket.js";

export const createBid = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  const { gigId, message, price } = req.body;

  if (await Bid.findOne({ gigId, freelancerId: req.user!.id }))
    return res.status(400).json({ message: "Already bid" });

  const bid = await Bid.create({
    gigId,
    freelancerId: req.user!.id,
    message,
    price,
  });

  res.status(201).json(bid);
};

export const getBidsForGig = async (req: Request, res: Response) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

export const hireBid = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid || bid.status !== "pending") throw new Error("Invalid bid");

    const gig = await Gig.findOne({
      _id: bid.gigId,
      ownerId: req.user!.id,
      status: "open",
    }).session(session);

    if (!gig) throw new Error("Gig already assigned");

    gig.status = "assigned";
    await gig.save({ session });

    bid.status = "hired";
    await bid.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();

    getIO()
      .to(bid.freelancerId.toString())
      .emit("hired", { gigTitle: gig.title });

    res.json({ success: true });
  } catch (err: any) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};
