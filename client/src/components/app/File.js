import React, { useState } from 'react';

export const File = ({data}) => {

    const downloadFile = (event) => {
        console.log('download file')
    }

    const deleteFile = (event) => {
        console.log(data);
        console.log('delete file')
    }

    return (
        <div className="file">
            <div>{data.id}</div>
            <div>{data.filename}</div>
            <div>{data.filesize}</div>
            <div>{data.createdAt.toLocaleDateString()}</div>
            <button onClick={downloadFile}>Download</button>
            <button onClick={deleteFile}>Delete</button>
        </div>
    )
}