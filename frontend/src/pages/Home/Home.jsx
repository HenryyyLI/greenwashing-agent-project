import { useState } from "react";

export default function GreenwashingScanner() {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [highlights, setHighlights] = useState([]);

    const handleAnalyze = async () => {
        const formData = new FormData();

        if (file) {
            formData.append("file", file);
        } else if (text.trim()) {
            const blob = new Blob([text], { type: "text/plain" });
            formData.append("file", blob, "input.txt");
        } else {
            alert("Please paste text or upload a PDF.");
            return;
        }

        const res = await fetch("http://localhost:8000/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setHighlights(data.highlights || []);
    };

    return (
        <div className="mt-[100px] min-h-screen bg-[#F8FFF8] text-[#3D4A3D] font-sans">
            <main className="max-w-6xl mx-auto p-8 flex flex-col lg:flex-row gap-8">
                <section className="bg-white p-6 rounded-lg shadow-lg flex-1 flex flex-col gap-6">
                    <h2 className="text-2xl font-medium">Submit Content</h2>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-[#3D4A3D]">Paste Text:</label>
                        <textarea
                            rows={10}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="border border-gray-300 rounded-md p-3 resize-y focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Enter your text here..."
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-[#3D4A3D]">Upload PDF:</label>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="text-gray-600"
                        />
                    </div>

                    <button
                        onClick={handleAnalyze}
                        className="bg-[#33DB5B] text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-[#28b34a] active:scale-95 transition"
                    >
                        Analyze
                    </button>
                </section>

                <section className="bg-white p-6 rounded-lg shadow-lg flex-1 flex flex-col gap-6">
                    <h2 className="text-2xl font-medium">Detected Greenwashing</h2>

                    <ul className="space-y-2 max-h-72 overflow-y-auto">
                        {highlights.map((item, idx) => (
                            <li
                                key={idx}
                                className="bg-red-100 border-l-4 border-red-600 p-3 rounded"
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}
