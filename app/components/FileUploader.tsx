import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'


interface FileUploaderProps {
    onFileSelect?:(file:File | null) => void;
}

const FileUploader = ({onFileSelect}:FileUploaderProps) =>{
    

    const onDrop = useCallback((acceptedFiles : File[]) => {

        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
        // Do something with the files
    }, [onFileSelect])
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple:false,
        accept:{'application/pdf': ['.pdf']},
        maxSize: 20 * 1024 * 1024,

    })

    const file = acceptedFiles[0] || null;

    return(
        <div className = "w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className = "space-y-4 cursor-pointer">
                   <div className = "mx-auto w-16 h-16 flex items-center justify-center">
                       <img src = "/icons/info.svg" alt = "upload" className = "size-20" />
                   </div>
                    {file ? (
                        <></>
                    ):(
                        <div>
                            <p className = "text-lg text-gray-500">
                                <span className = "semibold">
                                    Click to upload
                                </span>
                                or drag and drop
                            </p>
                            <p className = "text-lg text-gray-500">PDF (max 20 MB)</p>
                        </div>
                        )}
                </div>
            </div>
        </div>
    )
}
export default FileUploader;