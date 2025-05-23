import fetch from "node-fetch";
import FormData from "form-data";

export const sendFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const formData = new FormData();
        formData.append("file", req.file.buffer, req.file.originalname);

        const fastapiRes = await fetch("http://localhost:8000/upload", {
            method: "POST",
            headers: {
                ...formData.getHeaders(),
            },
            body: formData,
        });

        const data = await fastapiRes.json();

        if (!fastapiRes.ok) {
            return res.status(fastapiRes.status).json({ error: data.detail || "FastAPI error" });
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};