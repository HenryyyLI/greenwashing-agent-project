import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req, res) => {
    // root route http://localhost:5000/
    // res.send("Hello world! "); 
// });

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`);
}); 

