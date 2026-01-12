// src/routes/gig.routes.ts
import express from "express";
import { getGigs, createGig, getGigById } from "../controllers/gig.controller.js";
import { protect } from "../middlware/auth.middleware.js"; 
const router = express.Router();
router.get("/", getGigs);
router.post("/", protect, createGig);
router.get("/:id", getGigById);
export default router;
