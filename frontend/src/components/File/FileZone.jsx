import React from "react";
import { useDropzone } from 'react-dropzone';

const FileZone = ({ onFileDrop, loading }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                await onFileDrop(acceptedFiles[0]);
            }
        },
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
        <div>
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
                                            Supports: PDF (.pdf), Word (.doc), Text (.txt)
                                        </p>
                                    </>
                                )}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default FileZone