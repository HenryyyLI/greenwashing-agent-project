import express from "express";

import { sendFile } from "../controllers/file.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/submit", protectRoute, upload.single("file"), sendFile);

export default router;