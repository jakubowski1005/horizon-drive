import React, { useState } from "react";
import {LoginTest} from "./LoginTest";

export const UploadTest = () => {

    const [uploadedFile, setUploadedFile] = useState(null);

    const onFileUpload = () => {

        console.log(uploadedFile);
        const url = "http://localhost:8080/upload"
        const body = new FormData();
        body.append("filename", uploadedFile.name)
        body.append("file", uploadedFile)
        setUploadedFile(null);
        fetch(url, {method: 'POST', body: body})
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    const onFileChange = (event) => {
        setUploadedFile(event.target.files[0]);
    }

    const testConnection = () => {
        const url = "http://localhost:8080/connection"
        fetch(url)
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    return (
        <>
            <LoginTest/><br/><br/><br/>
            <button onClick={testConnection}>Test connection</button><br/>
            <input type="file" onChange={onFileChange} /><br/>
            <button onClick={onFileUpload}>Upload</button>
        </>
    )
}