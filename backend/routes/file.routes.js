import express from "express";
import multer from 'multer';

import { sendFile } from "../controllers/file.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/submit", protectRoute, upload.single("file"), sendFile);

export default router;