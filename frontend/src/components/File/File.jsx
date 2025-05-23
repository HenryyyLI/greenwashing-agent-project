import React from "react";
import useUploadFile from '../../hooks/useUploadFiile';

import { useDropzone } from 'react-dropzone';

const File = () => {
    const { loading, uploadFiles } = useUploadFile();

    const onDrop = async (acceptedFiles) => {
        await uploadFiles(acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'text/plain': ['.txt'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        },
        maxFiles: 1,
        multiple: false,
    });

    return (
        <div className="left w-2/5">
            <div
                {...getRootProps()}
                className={`flex flex-col h-full border-2 border-dashed rounded-md p-8 cursor-pointer items-center justify-center 
                    ${isDragActive
                        ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                    }`
                }
            >
                <input {...getInputProps()} />
                {loading ? (
                    <span className="loading loading-spinner loading-lg"></span>
                ) : (
                        <div className="text-center">
                            {isDragActive ? (
                                <p className="text-blue-500 font-medium">Drop the file here</p>
                            ) : (
                                    <>
                                        <p className="text-gray-600">Drag and drop a file here, or click to select</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Supports: PDF, Word (.doc/.docx), Text
                                        </p>
                                    </>
                                )}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default File
