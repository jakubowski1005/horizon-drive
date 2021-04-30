import React, { useState } from 'react';
import { uploadFile } from '../../service/DataService'

export const Uploader = () => {

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const onFilesUpload = () => {
        uploadedFiles.forEach(file => {
            const body = new FormData();
            body.append("filename", file.name)
            body.append("file", file)

            uploadFile(body)
                .then(res => console.log(res))
                .catch(err => console.error(err));
            })
    }

    const onFileChange = (event) => {
        setUploadedFiles(event.target.files);
    }

    return (
        <div className="uploader">
            <input type="file" onChange={onFileChange} /><br/>
            <button onClick={onFilesUpload}>Upload</button>
        </div>
    )
}