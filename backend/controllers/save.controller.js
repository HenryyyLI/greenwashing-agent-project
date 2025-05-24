import File from "../models/file.model.js";

export const saveFile = async (req, res) => {
    try {
        const { data, newData } = req.body;
        const userId = req.user._id;

        if (!data || !newData) {
            return res.status(400).json({ error: "Missing data or newData" });
        }

        const newFile = await File.create({
            fileName: data.fileName,
            documentText: data.documentText,
            userId: userId,
            highlights: data.highlights,
            stats: data.stats,
            revised: newData.revised,
            changedParts: newData.changedParts
        });

        res.status(201).json(newFile);
    } catch (error) {
        console.log("Error in save controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}