import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true
    },
    documentText: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    highlights: [{
        text: String,
        page: Number,
        risk: {
            type: String,
            enum: ['red', 'yellow', 'blue']
        },
        reason: String,
        evidence: String
    }],
    stats: {
        redCount: Number,
        yellowCount: Number
    },
    revised: {
        type: String
    },
    changedParts: [{
        text: String,
        original: String
    }]
    // createAt, updateAt
}, { timestamps: true });

const File = mongoose.model("File", fileSchema);

export default File;