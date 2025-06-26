import express from "express";
import { updateStreak } from "../controllers/streak.controller.js";

const router = express.Router();

router.post("/update", updateStreak);

export default router;
