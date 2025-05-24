import React, { useState } from 'react';
import useAnalyze from '../../hooks/useSendFile';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FileZone from '../../components/File/FileZone';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LeftCard = () => {
    const [loadingFile, setLoadingFile] = useState(false);
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const { loading, analyze } = useAnalyze();

    const handleFileDrop = async (file) => {
        setLoadingFile(true);
        setFile(file);
        // console.log(file);
        setLoadingFile(false);
    };
    
    return (
        <Card className="bg-white p-6 flex-1 flex flex-col gap-4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight">Submit Content</h2>

            <div className="flex flex-col gap-2">
                <Label className="ml-[2px] mb-[4px] text-[#3D4A3D] text-xl font-semibold" htmlFor="inputText">Paste Text</Label>
                <Textarea
                    id="inputText"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[200px] max-h-[300px]"
                    placeholder="Enter your text here..."
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label className="ml-[2px] mb-[4px] text-[#3D4A3D] text-xl font-semibold">Upload File</Label>
                <FileZone onFileDrop={handleFileDrop} loading={loadingFile} />
                {file && (
                    <div className="text-sm text-green-600 mt-2">
                        ✅ File loaded: {file.name}
                    </div>
                )}
            </div>

            <Button className="bg-[#33DB5B] font-semibold cursor-pointer h-[50px] text-white px-6 py-2 rounded-md text-lg hover:bg-[#28b34a]"
                disabled={loading}
                onClick={() => {
                    analyze({ file, text }).then(() => {
                        setText("");
                        setFile(null);
                    });
                }}
            >
                {loading ? <span className="loading loading-spinner loading-lg"></span> : "Analyze"}
            </Button>
        </Card>
    )
}

export default LeftCard
