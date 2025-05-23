import { useState } from 'react';
import toast from 'react-hot-toast';
import useContext from '../zustand/useContext';

const useUploadFile = () => {
    const [loading, setLoading] = useState(false);
    const { setFileResponse } = useContext();

    const uploadFiles = async (files) => {
        const file = files[0];

        const allowedTypes = [
            'application/pdf',
            'text/plain',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error('Unsupported file type');
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const res = await fetch("/api/file/submit", {
                method: "POST",
                body: formData,
                credentials: 'include',
            });

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }
            // console.log(data);

            setFileResponse(data.text);
            toast.success('File uploaded successfully');

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, uploadFiles };
};

export default useUploadFile;