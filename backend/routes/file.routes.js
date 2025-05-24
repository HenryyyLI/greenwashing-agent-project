import express from "express";

import { saveFile } from "../controllers/save.controller.js";
import { fetchHistory } from "../controllers/history.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post('/save', protectRoute, saveFile);
router.get("/history/:id", protectRoute, fetchHistory);

export default router;