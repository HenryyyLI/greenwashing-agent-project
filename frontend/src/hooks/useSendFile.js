import { useState } from "react";
import toast from "react-hot-toast";
import useContext from '../zustand/useContext';

const useAnalyze = () => {
    const [loading, setLoading] = useState(false);
    const { setData, setNewData } = useContext();

    const analyze = async ({ file, text }) => {
        const formData = new FormData();

        if (!file && !text?.trim()) {
            toast.error("Please upload a file or enter some text");
            return;
        }

        try {
            setLoading(true);

            if (file) {
                formData.append("file", file);
            } else {
                const blob = new Blob([text], { type: "text/plain" });
                formData.append("file", blob, "input.txt");
            }

            const res = await fetch("http://localhost:8000/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Upload failed");
            }

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            // console.log(data);
            setData(data);

            const resNew = await fetch("http://localhost:8000/revise", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    original: data.documentText,
                    claims: data.highlights
                })
            });

            if (!resNew.ok) {
                const errorData = await resNew.json();
                throw new Error(errorData.message || "Revision failed");
            }

            const newData = await resNew.json();
            if (newData.error) {
                throw new Error(data.error);
            }
            // console.log(newData);
            setNewData(newData);

            const resFile = await fetch("/api/file/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data,
                    newData
                })
            });

            const result = await resFile.json();
            if(result.error) {
                throw new Error(result.error);
            }
            // console.log(result);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, analyze };
};

export default useAnalyze;
