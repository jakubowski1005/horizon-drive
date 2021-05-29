import React from 'react';
import { uploadFile } from '../../service/DataService'

export const Uploader = () => {

    const onFileChange = (event) => {
        Array.from(event.target.files).forEach(file => {
            const body = new FormData();
            body.append("filename", file.name)
            body.append("file", file)

            uploadFile(body)
                .then(res => console.log(res))
                .catch(err => console.error(err));
            })
    }

    return (
        <input className="file-input" type="file" onChange={onFileChange}/>
    )
}