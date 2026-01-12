import Gig from "../models/Gig.js";
export const getGigs = async (req, res) => {
    const search = req.query.search?.toString() || "";
    const gigs = await Gig.find({
        status: "open",
        title: { $regex: search, $options: "i" },
    });
    res.json(gigs);
};
export const getGigById = async (req, res) => {
    const gig = await Gig.findById(req.params.id);
    if (!gig) {
        return res.status(404).json({ message: "Gig not found" });
    }
    res.json(gig);
};
export const createGig = async (req, res) => {
    const gig = await Gig.create({
        ...req.body,
        ownerId: req.user.id,
    });
    res.status(201).json(gig);
};
