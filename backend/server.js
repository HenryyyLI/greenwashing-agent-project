import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/file", fileRoutes);

app.use('/fastapi', createProxyMiddleware({
    target: 'http://127.0.0.1:8000',
    changeOrigin: true,
    pathRewrite: { '^/fastapi': '' },
}));

app.options('/fastapi/*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

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

