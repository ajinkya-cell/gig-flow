// src/controllers/gig.controller.ts
import { Request, Response } from "express";
import Gig from "../models/Gig.js";

export const getGigs = async (req: Request, res: Response) => {
  const search = req.query.search?.toString() || "";
  const gigs = await Gig.find({
    status: "open",
    title: { $regex: search, $options: "i" },
  });
  res.json(gigs);
};

export const createGig = async (
  req: Request & { user?: { id: string } },
  res: Response
) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user!.id,
  });
  res.status(201).json(gig);
};
