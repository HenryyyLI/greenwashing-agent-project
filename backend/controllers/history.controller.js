import File from "../models/file.model.js";

export const fetchHistory = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const files = await File.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(files);
    } catch (error) {
        console.log("Error in fetchHistory controller:", error.message);
        res.status(500).json({error: "Internal server error"});
    }
};
