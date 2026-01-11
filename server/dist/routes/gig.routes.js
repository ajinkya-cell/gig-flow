// src/routes/gig.routes.ts
import express from "express";
import { getGigs, createGig } from "../controllers/gig.controller.js";
import { protect } from "../middlware/auth.middleware.js";
const router = express.Router();
router.get("/", getGigs);
router.post("/", protect, createGig);
export default router;
